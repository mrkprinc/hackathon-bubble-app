import { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react'
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
  const prevConnectedUsers = useRef(new Set<string>())

  useEffect(() => {
    if (!user) {
      setBubbleData(initialData);
      return;
    }

    const updatedConnectedUsers = new Set(user.connectedUsers);
    if (setsAreEqual(updatedConnectedUsers, prevConnectedUsers.current)) return;

    prevConnectedUsers.current = updatedConnectedUsers;
    updateBubbleData();
  }, [user]);

  function updateBubbleData() {
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
        name: usersData[id]?.displayName,
        image: usersData[id]?.photoURL ?? 'https://via.placeholder.com/150',
        isRoot: id === user.id,
      }))

      const edges: NetworkLink[] = []
      Object.entries(usersData).forEach(([id, userData]) => {
        userData.connectedUsers?.forEach((connectedId) => {
          edges.push({ source: id, target: connectedId })
        })
      })

      const updatedBubbleData = { usersData, uniqueIds, nodes, edges }
      console.log('Updated bubble data:', updatedBubbleData)
      setBubbleData(updatedBubbleData);
    })
  }

  return (
    <BubbleContext.Provider value={{ ...bubbleData, refresh: updateBubbleData }}>
      {children}
    </BubbleContext.Provider>
  )
}

function setsAreEqual(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (let a of setA) if (!setB.has(a)) return false;
  return true;
}

export const useBubble = () => useContext(BubbleContext)
