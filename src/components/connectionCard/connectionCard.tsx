import React from 'react';
import {
  Badge,
  CardTitle, CardSubtitle,
  Button, Row, Container, Col
} from 'reactstrap';

interface ConnectionProps {
  name: string
  imageUrl: string
  mutualConnections: number
  totalConnections: number
  isWorkSchool: boolean
}

const ConnectionCard: React.FC<ConnectionProps> = ({
  name, mutualConnections, totalConnections, isWorkSchool, imageUrl
}) => {

  return (
    <Container fluid >
      <Row>
        <Col xs={'auto'}>
          <img src={imageUrl} alt="avatar" className="rounded-circle" width="120" height="120" />
        </Col>
        <Col xs={'auto'}>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>
            Mutual connections <Badge color="info">{mutualConnections}</Badge>
          </CardSubtitle>
          <CardSubtitle>
            Total connections <Badge color="info">{totalConnections}</Badge>
          </CardSubtitle>
          {isWorkSchool && <Badge color="warning">Work/School</Badge>}
        </Col>
      </Row>
      <div style={{ display: 'flex', flex:1, flexDirection: "row-reverse"}}>
        <Button color="danger">Delete</Button>
      </div>
    </Container>
  );
};

export default ConnectionCard;
