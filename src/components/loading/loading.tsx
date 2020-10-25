import { Button, Card } from "reactstrap";
import authService from "src/services/auth.service";
import styles from "./loading.module.scss";

type LoadingProps = {};

const Loading: React.FC<LoadingProps> = () => (
  <div className={styles.container}>
    <div className={styles.card}>Loading your bubble...</div>
  </div>
);

export default Loading;
