import { useState } from "react";
import { useUser } from "src/context/userContext";
import bubbleService from "src/services/bubble.service";
import { Button, Input } from "reactstrap";
import styles from "./addToBubble.module.scss";

type AddToBubbleProps = {};

const AddToBubble: React.FC<AddToBubbleProps> = ({ children }) => {
  const [emailInput, setEmailInput] = useState("");
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <Input
        value={emailInput}
        placeholder="Input"
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <Button
        onClick={() => bubbleService.addToBubbleByEmail(user, emailInput)}
        color="info"
      >
        Add to Bubble
      </Button>
    </div>
  );
};

export default AddToBubble;
