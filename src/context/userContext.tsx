import { useState, useEffect, createContext, useContext } from 'react'
import firebase from 'src/firebase/clientApp'
import Collections from 'src/firebase/collections.enum'
import { Notification } from 'src/services/notifications.service'


export type User = {
  id: string
  displayName: string
  email: string
  photoURL: string
  createdAt?: firebase.firestore.Timestamp
  connectedUsers?: string[]
  notifications?: Notification[]
  externalOrg?: boolean
}

export const UserContext = createContext<{ user: User, [funcs: string]: any }>(null)

export default function UserContextComp({ children }) {
  const [user, setUser] = useState<User>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    let userDataUnsubscriber;
    const authUnsubscriber = firebase.auth().onAuthStateChanged(async (userProfile) => {
      try {
        if (userProfile) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = userProfile;
          const userDoc = await firebase.firestore().doc(`${Collections.USERS}/${uid}`).get();
          const nowStamp = firebase.firestore.Timestamp.now();

          if (userDoc.exists) {
            setUser({ ...userDoc.data(), id: uid, displayName, email, photoURL })
            await userDoc.ref.update({ displayName, email, photoURL, updatedAt: nowStamp })
          } else {
            // initialize user doc
            const initialData = {
              displayName,
              email,
              photoURL,
              connectedUsers: [],
              notifications: [],
              externalOrg: false,
              createdAt: nowStamp,
            }
            setUser({ ...initialData, id: uid });
            await userDoc.ref.set(initialData)
          }

          userDataUnsubscriber = userDoc.ref.onSnapshot((doc) => {
            console.log('Received updated user snapshot.')
            setUser((prevState) => Object.assign({}, prevState, doc.data()))
          })
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUser(false)
      }
    })

    // Unsubscribe on unmount
    return () => {
      authUnsubscriber();
      userDataUnsubscriber?.();
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
