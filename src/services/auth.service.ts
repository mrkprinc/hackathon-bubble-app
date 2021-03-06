import firebase from 'src/firebase/clientApp';
const provider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
  const auth = firebase.auth();

  auth.signInWithRedirect(provider);
  auth.getRedirectResult()
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((err) => {
      console.error(err);
    });
}

function signOut() {
  const auth = firebase.auth();

  auth.signOut()
    .then(() => console.log("Signout successful."))
    .catch((err) => console.error(err));
}

export default {
  signInWithGoogle,
  signOut,
}
