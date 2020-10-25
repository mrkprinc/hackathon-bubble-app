import { Button, Card } from "reactstrap";
import authService from "src/services/auth.service";
import styles from "./login.module.scss";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2>Find out who is in your bubble</h2>
      <h4>See how big your bubble truly is. </h4>
      <Button onClick={authService.signInWithGoogle} color="info">
        Sign In With Google
      </Button>
    </div>
  </div>
);

export default Login;
