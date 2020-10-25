import { ReactNode } from "react";
import { Progress } from "reactstrap";
import styles from "./bubbleSummaryContainer.module.scss";

type BubbleSummaryContainerProps = {
  children: ReactNode;
};

const BubbleSummaryContainer: React.FC<BubbleSummaryContainerProps> = ({
  children,
}) => {
  return (
    <div className={styles.container}>
      {children}

      <div style={{ width: "100%", maxWidth: 400 }} className={styles.example}>
        <Progress multi>
          <Progress bar color="secondary" value={40}>
            MyBubble users
          </Progress>
          <Progress bar color="secondary" style={{ opacity: 0.6 }} value={30}>
            Extra Connections
          </Progress>
        </Progress>
      </div>
    </div>
  );
};

export default BubbleSummaryContainer;
