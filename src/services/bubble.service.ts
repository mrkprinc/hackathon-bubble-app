import firebase from 'src/firebase/clientApp'
import Collections from 'src/firebase/collections.enum'
import { User } from 'src/context/userContext'
import { Notification } from './notifications.service'

async function getConnectedUsers(user: User): Promise<User[]> {
  if (!user?.connectedUsers?.length) {
    console.log("BubbleService: No connected users.")
    return [];
  }

  const connectedUsers = await firebase.firestore()
    .collection(Collections.USERS)
    .where(firebase.firestore.FieldPath.documentId(), 'in', user?.connectedUsers || [])
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User)))

  return connectedUsers;
}

async function addToBubbleByEmail(currentUser: User, email: string) {
  const db = firebase.firestore()
  const userToAddSnapshot = await db.collection(Collections.USERS)
    .where('email', '==', email)
    .get()
    .then((snapshot) => snapshot.docs[0]);

  if (!userToAddSnapshot) {
    console.error('BubbleService: No user with that email.');
    return false;
  }

  const currentUserRef = db.collection(Collections.USERS).doc(currentUser.id);
  const batch = db.batch();
  batch.update(currentUserRef, {
    connectedUsers: firebase.firestore.FieldValue.arrayUnion(userToAddSnapshot.id),
  });
  batch.update(userToAddSnapshot.ref, {
    connectedUsers: firebase.firestore.FieldValue.arrayUnion(currentUser.id),
    notifications: firebase.firestore.FieldValue.arrayUnion({
      type: 'New Connection',
      fromName: currentUser.displayName
    } as Notification)
  });
  await batch.commit();
  console.log('Added to bubble:', userToAddSnapshot.id)

  return true;
}

async function removeFromBubble(currentUser: User, userToRemove: User) {
  const db = firebase.firestore()

  const userToRemoveRef = await db.collection(Collections.USERS).doc(userToRemove.id)
  const currentUserRef = db.collection(Collections.USERS).doc(currentUser.id);

  const batch = db.batch();
  batch.update(currentUserRef, {
    connectedUsers: firebase.firestore.FieldValue.arrayRemove(userToRemove.id),
  });
  batch.update(userToRemoveRef, {
    connectedUsers: firebase.firestore.FieldValue.arrayRemove(currentUser.id),
    notifications: firebase.firestore.FieldValue.arrayUnion({
      type: 'Removed Connection',
      fromName: currentUser.displayName
    } as Notification)
  });
  await batch.commit();
  console.log('Removed from bubble:', userToRemove.id);

  return true;
}

async function setExternalOrg(user: User, checked: boolean) {
  return firebase.firestore().collection(Collections.USERS).doc(user.id).update({
    externalOrg: checked,
  })
}

export default {
  getConnectedUsers,
  addToBubbleByEmail,
  removeFromBubble,
  setExternalOrg,
}
