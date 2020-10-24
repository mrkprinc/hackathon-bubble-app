import { useEffect } from 'react'
import { useUser } from 'src/context/userContext'
import authService from 'src/services/auth.service'


export default function TempLogin() {
  const { loadingUser, user } = useUser();

  useEffect(() => {
    if (!loadingUser) {
      console.log(user);
    }
  }, [loadingUser, user])

  return (
    <button onClick={authService.signInWithGoogle}>Sign In With Google</button>
  );
}
