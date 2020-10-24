import { useState, useEffect, createContext, useContext } from 'react'
import firebase from 'src/firebase/clientApp'
import Collections from 'src/firebase/collections.enum'

export type User = {
  id: string
  displayName: string
  email: string
  photoURL: string
  createdAt?: firebase.firestore.Timestamp
  connectedUsers?: string[]
}

export const UserContext = createContext<{ user: User, [funcs: string]: any }>(null)

export default function UserContextComp({ children }) {
  const [user, setUser] = useState<User>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (userProfile) => {
      try {
        if (userProfile) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = userProfile;
          const userDoc = await firebase.firestore().doc(`${Collections.USERS}/${uid}`).get();
          const nowStamp = firebase.firestore.Timestamp.now();

          if (userDoc.exists) {
            userDoc.ref.update({ displayName, email, photoURL, updatedAt: nowStamp })
            setUser({ ...userDoc.data(), id: uid, displayName, email, photoURL })
          } else {
            // initialize user doc
            const initialData = {
              displayName,
              email,
              photoURL,
              connectedUsers: [],
              createdAt: nowStamp,
            }
            userDoc.ref.set(initialData)
            setUser({ ...initialData, id: uid });
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUser(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)
