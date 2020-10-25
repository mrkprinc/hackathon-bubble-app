import React from "react";
import { Progress } from "reactstrap";
import styles from "./bubbleSummary.module.scss";

interface BubbleSummaryProps {
  title: string;
  count: number;
  max: number;
  extra?: number;
}

const BubbleSummary: React.FC<BubbleSummaryProps> = ({
  title = "",
  count = 0,
  max = 100,
  extra = 0,
}) => {
  const total = extra + count;
  const getCountColor = () => {
    if (total > 0 && total <= 4) {
      return "success";
    }
    if (total > 4 && total <= 10) {
      return "warning";
    }
    return "danger";
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <Progress multi>
        <Progress bar color={getCountColor()} value={count} max={max}>
          {count}
        </Progress>
        <Progress
          bar
          color={getCountColor()}
          style={{ opacity: 0.6 }}
          value={extra}
          max={max}
        >
          {extra}
        </Progress>
      </Progress>
    </div>
  );
};

export default BubbleSummary;
