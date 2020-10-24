import Head from "next/head";
import MainNav from "src/components/nav/mainNav";
import { Container } from "reactstrap";
import styles from "./bubbleVisual.module.scss";

type BubbleVisualProps = {};

const BubbleVisual: React.FC<BubbleVisualProps> = ({ children }) => (
  <div className={styles.container}>
    <img src="/example.png" alt="Example" className={styles.visualization} />
  </div>
);

export default BubbleVisual;
