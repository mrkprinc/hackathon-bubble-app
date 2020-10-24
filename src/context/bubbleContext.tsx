import { useState, useEffect, createContext, useContext } from 'react'
import bubbleService from 'src/services/bubble.service'
import { User, useUser } from './userContext'

export type BubbleData = {
  usersData: {
    [id: string]: User
  },
  uniqueIds: Set<string>,
  refresh: () => void
}

const initialData = {
  usersData: {},
  uniqueIds: new Set<string>()
}

export const BubbleContext = createContext<BubbleData>(null)

export default function BubbleContextComp({ children }) {
  const [bubbleData, setBubbleData] = useState(initialData)

  const { user } = useUser()

  function getBubbleData() {
    if (!user) {
      setBubbleData(initialData);
      return;
    }

    bubbleData.uniqueIds.add(user.id);
    bubbleData.usersData[user.id] = user;
    user.connectedUsers?.forEach(bubbleData.uniqueIds.add, bubbleData.uniqueIds);
    
    bubbleService.getConnectedUsers(user).then(connectedUsers => {
      connectedUsers.forEach((connectedUser) => {
        bubbleData.usersData[connectedUser.id] = connectedUser;
        connectedUser.connectedUsers?.forEach(bubbleData.uniqueIds.add, bubbleData.uniqueIds);
      });

      console.log(bubbleData)
      setBubbleData({ ...bubbleData });
    })
  }

  useEffect(getBubbleData, [user]);

  return (
    <BubbleContext.Provider value={{ ...bubbleData, refresh: getBubbleData }}>
      {children}
    </BubbleContext.Provider>
  )
}

export const useBubble = () => useContext(BubbleContext)
