import { Button } from "reactstrap";
import authService from "src/services/auth.service";
import styles from "./login.module.scss";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Find out who is in your bubble</h2>
      <h5 className={styles.subtitle}>See how big your bubble truly is.</h5>
      <Button onClick={authService.signInWithGoogle} color="info">
        Sign In With Google
      </Button>
    </div>
    <div className={styles.circle}></div>
  </div>
);

export default Login;
