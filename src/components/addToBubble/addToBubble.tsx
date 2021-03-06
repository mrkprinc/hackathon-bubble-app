import { useState } from "react";
import { useUser } from "src/context/userContext";
import bubbleService from "src/services/bubble.service";
import { Button, Input, InputGroup } from "reactstrap";
import styles from "./addToBubble.module.scss";

type AddToBubbleProps = {};

const AddToBubble: React.FC<AddToBubbleProps> = ({ children }) => {
  const [emailInput, setEmailInput] = useState("");
  const { user } = useUser();

  return (
    <div className={styles.container}>
      <InputGroup>
        <Input
          value={emailInput}
          placeholder="Email Address"
          onChange={(e) => setEmailInput(e.target.value)}
          className={styles.input}
        />
        <Button
          onClick={() => bubbleService.addToBubbleByEmail(user, emailInput)}
          color="info"
        >
          Add to your Bubble
        </Button>
      </InputGroup>
    </div>
  );
};

export default AddToBubble;
