import { ReactNode } from "react";
import styles from "./bubbleVisual.module.scss";

type BubbleVisualProps = {
  children: ReactNode;
};

const BubbleVisual: React.FC<BubbleVisualProps> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default BubbleVisual;
