import { Button, Card } from "reactstrap";
import authService from "src/services/auth.service";
import styles from "./loading.module.scss";

type LoadingProps = {};

const Loading: React.FC<LoadingProps> = () => (
  <div className={styles.container}>
    <Card className={styles.card}>Loading ...</Card>
  </div>
);

export default Loading;
