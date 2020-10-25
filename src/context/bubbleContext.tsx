import { useState, useEffect, createContext, useContext, useRef } from 'react'
import bubbleService from 'src/services/bubble.service'
import { User, useUser } from './userContext'
import { NetworkNode, NetworkLink } from 'src/components/force-graph'

export type BubbleData = {
  usersData: {
    [id: string]: User
  },
  uniqueIds: Set<string>,
  totalExtraBubbleMembers: number
  refresh: () => void,
  nodes: NetworkNode[],
  edges: NetworkLink[],
}

const initialData = {
  usersData: {} as { [id: string]: User },
  uniqueIds: new Set<string>(),
  totalExtraBubbleMembers: 0,
  nodes: [],
  edges: []
}

export const BubbleContext = createContext<BubbleData>(null)

export default function BubbleContextComp({ children }) {
  const [bubbleData, setBubbleData] = useState(initialData)

  const { user } = useUser()
  const prevUserData = useRef({
    connectedUsers: new Set<string>(),
    externalOrg: false,
    extraBubbleMembers: 0,
  })

  useEffect(() => {
    if (!user) {
      setBubbleData(initialData);
      return;
    }

    const updatedConnectedUsers = new Set(user.connectedUsers);
    if (
      user.externalOrg === prevUserData.current.externalOrg &&
      user.extraBubbleMembers === prevUserData.current.extraBubbleMembers &&
      setsAreEqual(updatedConnectedUsers, prevUserData.current.connectedUsers)
    ) return;

    prevUserData.current = {
      connectedUsers: updatedConnectedUsers,
      externalOrg: user.externalOrg,
      extraBubbleMembers: user.extraBubbleMembers,
    }

    updateBubbleData();
  }, [user]);

  function updateBubbleData() {
    const usersData: { [id: string]: User } = {};
    const uniqueIds = new Set<string>();
    let totalExtraBubbleMembers = 0

    uniqueIds.add(user.id);
    usersData[user.id] = user;
    totalExtraBubbleMembers += user.extraBubbleMembers ?? 0;
    user.connectedUsers?.forEach(uniqueIds.add, uniqueIds);
    
    bubbleService.getConnectedUsers(user).then(connectedUsers => {
      connectedUsers.forEach((connectedUser) => {
        usersData[connectedUser.id] = connectedUser;
        totalExtraBubbleMembers += connectedUser.extraBubbleMembers ?? 0
        connectedUser.connectedUsers?.forEach(uniqueIds.add, uniqueIds);
      });

      const nodes = Array.from(uniqueIds).map((id): NetworkNode => ({
        id,
        name: usersData[id]?.displayName,
        image: usersData[id]?.photoURL ?? '/avatar_placeholder.jpg',
        isRoot: id === user.id,
        externalOrg: !!usersData[id]?.externalOrg,
        extraBubbleMembers: usersData[id]?.extraBubbleMembers ?? 0
      }))

      const edges: NetworkLink[] = []
      Object.entries(usersData).forEach(([id, userData]) => {
        userData.connectedUsers?.forEach((connectedId) => {
          edges.push({ source: id, target: connectedId })
        })
      })

      const updatedBubbleData = { usersData, uniqueIds, totalExtraBubbleMembers, nodes, edges }
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
