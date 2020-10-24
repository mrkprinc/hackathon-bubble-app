import { useState, useRef } from 'react'
import { useUser } from 'src/context/userContext'
import { useBubble } from 'src/context/bubbleContext'
import authService from 'src/services/auth.service'
import bubbleService from 'src/services/bubble.service';


export default function TempLogin() {
  const { loadingUser, user } = useUser();
  const { usersData } = useBubble();

  const [emailInput, setEmailInput] = useState('');

  return (
    <div>
      {loadingUser && <div>Loading user...</div>}

      {user ? (
        <>
          <div>User: {user.displayName}</div>
          <button onClick={authService.signOut}>Sign Out</button>

          <div>
            <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
            <button onClick={() => bubbleService.addToBubbleByEmail(user, emailInput)}>Add to Bubble</button>
          </div>

          <div>My Bubble:</div>
          {user.connectedUsers?.map((id) => (
            <div key={id}>{usersData[id]?.displayName || id}</div>
          ))}
        </>
      ) : (
        <button onClick={authService.signInWithGoogle}>Sign In With Google</button>
      )}
    </div>
  );
}
