import React from 'react';
import {
  Card, CardBody, CardTitle, Progress
} from 'reactstrap';

interface BubbleSummaryProps {
  title: string
  count: number
  max: number
  extra?: number
}

const BubbleSummary: React.FC<BubbleSummaryProps> = ({ title = '', count = 0, max = 100, extra = 0 }) => {
  const getCountColor = () => {
    if(count > 0 && count <= 4){
      return "success"
    } 
    if(count > 4 && count <= 10){
      return "warning"
    } 
    return "error"
  }

  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardBody>
      <Progress multi>
        <Progress bar color={getCountColor()} value={count} max={max}>{count}</Progress>
        <Progress bar color="info" value={extra} max={max}>{extra}</Progress>
      </Progress>
      </CardBody>
    </Card>
  );
};

export default BubbleSummary;
