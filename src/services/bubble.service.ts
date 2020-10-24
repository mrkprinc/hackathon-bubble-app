import firebase from 'src/firebase/clientApp'
import Collections from 'src/firebase/collections.enum'
import { User } from 'src/context/userContext'

async function getUserBubble(user: User) {
  if (!user?.connectedUsers?.length) return [];

  const connectedUsers = await firebase.firestore()
    .collection(Collections.USERS)
    .where(firebase.firestore.FieldPath.documentId(), 'in', user?.connectedUsers || [])
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()));

  console.log(connectedUsers);
  return connectedUsers;
}

export default {
  getUserBubble,
}
