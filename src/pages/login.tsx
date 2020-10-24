import { useState, useRef } from "react";
import { useUser } from "src/context/userContext";
import { useBubble } from "src/context/bubbleContext";
import authService from "src/services/auth.service";
import bubbleService from "src/services/bubble.service";
import { Button, Card } from "reactstrap";
import styles from "./login.module.scss";

export default function TempLogin() {
  // const { loadingUser, user } = useUser();
  // const { usersData } = useBubble();

  // const [emailInput, setEmailInput] = useState("");

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h2>Find out who is in your bubble</h2>
        <h4>See how big your bubble truly is</h4>
        <Button onClick={authService.signInWithGoogle} color="info">
          Sign In With Google
        </Button>
        {/* {loadingUser && <div>Loading user...</div>} */}
        {/* <button onClick={authService.signInWithGoogle}>
        Sign In With Google
      </button> */}
        {/* {user ? (
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
      )} */}
      </Card>
    </div>
  );
}
