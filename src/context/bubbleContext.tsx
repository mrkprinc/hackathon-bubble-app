import { useState, useEffect, createContext, useContext } from 'react'
import bubbleService from 'src/services/bubble.service'
import { User, useUser } from './userContext'

export type BubbleData = {
  usersData: {
    [id: string]: User
  },
  uniqueIds: Set<string>,
  refresh: () => void,
  nodes: any,
  links: any
}

const initialData = {
  usersData: {},
  uniqueIds: new Set<string>()
}

export const BubbleContext = createContext<BubbleData>(null)

export default function BubbleContextComp({ children }) {
  const [bubbleData, setBubbleData] = useState(initialData)
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])

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
      setLinks(user.connectedUsers.map(connectedUser => ({
        source: user.id,
        target: connectedUser
      })))
      setNodes(Object.keys(bubbleData.usersData).map(userKey => ({
        name: bubbleData.usersData[userKey].displayName, image: bubbleData.usersData[userKey].photoURL, id: bubbleData.usersData[userKey].id
      })))

    })
  }

  useEffect(getBubbleData, [user]);

  return (
    <BubbleContext.Provider value={{ ...bubbleData, refresh: getBubbleData, nodes, links }}>
      {children}
    </BubbleContext.Provider>
  )
}

export const useBubble = () => useContext(BubbleContext)
