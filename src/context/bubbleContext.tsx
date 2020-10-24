import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import bubbleService from 'src/services/bubble.service'
import { User, useUser } from './userContext'
import { NetworkNode, NetworkLink } from 'src/components/force-graph'

export type BubbleData = {
  usersData: {
    [id: string]: User
  },
  uniqueIds: Set<string>,
  refresh: () => void,
  nodes: NetworkNode[],
  edges: NetworkLink[],
}

const initialData = {
  usersData: {} as { [id: string]: User },
  uniqueIds: new Set<string>(),
  nodes: [],
  edges: []
}

export const BubbleContext = createContext<BubbleData>(null)

export default function BubbleContextComp({ children }) {
  const [bubbleData, setBubbleData] = useState(initialData)

  const { user } = useUser()
  const getBubbleData = useCallback(function() {
    if (!user) {
      setBubbleData(initialData);
      return;
    }

    const usersData: { [id: string]: User } = {};
    const uniqueIds = new Set<string>();

    uniqueIds.add(user.id);
    usersData[user.id] = user;
    user.connectedUsers?.forEach(uniqueIds.add, uniqueIds);
    
    bubbleService.getConnectedUsers(user).then(connectedUsers => {
      connectedUsers.forEach((connectedUser) => {
        usersData[connectedUser.id] = connectedUser;
        connectedUser.connectedUsers?.forEach(uniqueIds.add, uniqueIds);
      });

      const nodes: NetworkNode[] = Array.from(uniqueIds).map((id) => ({
        id,
        name: bubbleData.usersData[id]?.displayName,
        image: bubbleData.usersData[id]?.photoURL ?? 'https://via.placeholder.com/150',
        isRoot: id === user.id,
      }))

      const edges: NetworkLink[] = []
      Object.entries(usersData).forEach(([id, userData]) => {
        userData.connectedUsers?.forEach((connectedId) => {
          edges.push({ source: id, target: connectedId })
        })
      })

      console.log('bubbleData', { usersData, uniqueIds, nodes, edges })
      setBubbleData({ usersData, uniqueIds, nodes, edges });
    })
  }, [user])

  useEffect(getBubbleData, [user]);

  return (
    <BubbleContext.Provider value={{ ...bubbleData, refresh: getBubbleData }}>
      {children}
    </BubbleContext.Provider>
  )
}

export const useBubble = () => useContext(BubbleContext)
