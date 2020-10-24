import React from 'react';
import {
  Card, CardBody, CardTitle, Progress
} from 'reactstrap';

interface BubbleSummaryProps {
  title: string
  count: number
  max: number
}

const BubbleSummary: React.FC<BubbleSummaryProps> = ({ title = '', count = 0, max=100}) => {
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
      <Progress color={getCountColor()} value={count} max={max} >{count}</Progress>
      </CardBody>
    </Card>
  );
};

export default BubbleSummary;
