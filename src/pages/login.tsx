import { useState, useEffect } from 'react'
import { useUser } from 'src/context/userContext'
import authService from 'src/services/auth.service'
import bubbleService from 'src/services/bubble.service';


export default function TempLogin() {
  const { loadingUser, user } = useUser();
  const [emailInput, setEmailInput] = useState('');

  return (
    <div>
      {loadingUser && <div>Loading user...</div>}

      {user ? (
        <>
          <div>User: {user.displayName}</div>
          <button onClick={authService.signOut}>Sign Out</button>
          <button onClick={() => bubbleService.getUserBubble(user)}>Log My Bubble</button>

          <div>
            <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
            <button onClick={() => bubbleService.addToBubbleByEmail(user, emailInput)}>Add to Bubble</button>
          </div>
        </>
      ) : (
        <button onClick={authService.signInWithGoogle}>Sign In With Google</button>
      )}
    </div>
  );
}
