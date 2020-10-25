import React from 'react';
import {
  Badge,
  CardTitle, CardSubtitle,
  Button, Row, Container, Col
} from 'reactstrap';
import { useUser } from 'src/context/userContext';
import bubbleService from "src/services/bubble.service";

interface ConnectionProps {
  connection: any
  mutualConnections: number
  totalConnections: number
}

const ConnectionCard: React.FC<ConnectionProps> = ({ connection, mutualConnections, totalConnections }) => {
  const { user } = useUser();
  return (
    <Container fluid className="py-4 mt-4 border">
      <Row>
        <Col xs="auto" sm="auto">
          <div style={{ width: '75px', height: '75px' }}>
            <img src={connection.photoURL || '/avatar_placeholder.jpg'} alt="avatar" className="rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </Col>
        <Col xs="auto" sm="auto" className="flex-grow-1">
          <CardTitle className="font-weight-bolder">{connection.displayName}</CardTitle>
           <CardSubtitle className="mb-1">
            Mutual connections <Badge color="info">{mutualConnections}</Badge>
          </CardSubtitle>
          <CardSubtitle className="mb-1">
            Total connections <Badge color="info">{totalConnections}</Badge>
          </CardSubtitle>
          {connection.externalOrg && <Badge color="warning">Work/School</Badge>}
        </Col>
        <Col xs={12} sm="auto" className="align-self-center">
          <Button color="danger" onClick={() => bubbleService.removeFromBubble(user, connection)}>Delete</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ConnectionCard;
