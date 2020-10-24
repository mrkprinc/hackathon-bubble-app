import Head from "next/head";
import MainNav from "src/components/nav/mainNav";
import { Container } from "reactstrap";
import styles from "./myBubble.module.scss";

type MyBubbleProps = {};

const MyBubble: React.FC<MyBubbleProps> = ({ children }) => (
  <div className={styles.container}>
    <img src="/example.png" alt="Example" className={styles.visualization} />
  </div>
);

export default MyBubble;
