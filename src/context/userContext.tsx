import { useState, useEffect, createContext, useContext } from 'react'
import firebase from 'src/firebase/clientApp'

type User = {
  id: string
  displayName: string
  email: string
  photoURL: string
  createdAt?: firebase.firestore.Timestamp
  userConnections?: string[]
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
          const userDoc = await firebase.firestore().doc(`users/${uid}`).get();

          if (userDoc.exists) {
            setUser({ ...userDoc.data(), id: uid, displayName, email, photoURL })
          } else {
            // initialize user doc
            const initialData = { userConnections: [], createdAt: firebase.firestore.Timestamp.now() }
            userDoc.ref.set(initialData)
            setUser({ ...initialData, id: uid, displayName, email, photoURL });
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
