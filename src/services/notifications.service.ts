import firebase from 'firebase'
import Collections from 'src/firebase/collections.enum'
import { User } from 'src/context/userContext'

export type Notification = {
  type: 'New Connection' | 'Possible Exposure Warning' | 'Positive Test Warning'
  fromName?: string
}

async function sendNotificationToUsers(userIds: string[], notification: Notification) {
  const db = firebase.firestore();
  const dbUsers = db.collection(Collections.USERS)
  const batch = db.batch();

  userIds.forEach((id) => {
    batch.update(dbUsers.doc(id), {
      notifications: firebase.firestore.FieldValue.arrayUnion(notification),
    })
  })

  await batch.commit();
  return true;
}

async function dismissNotification(user: User, notification: Notification) {
  const userDoc = firebase.firestore().collection(Collections.USERS).doc(user.id)
  await userDoc.update({
    notifications: firebase.firestore.FieldValue.arrayRemove(notification),
  })
  return true;
}

export default {
  sendNotificationToUsers,
  dismissNotification,
}
