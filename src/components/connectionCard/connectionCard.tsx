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
  // mutualConnections: number
  // totalConnections: number
}

const ConnectionCard: React.FC<ConnectionProps> = ({ connection }) => {
  const { user } = useUser();
  return (
    <Container fluid className={'mt-1 mb-1'}>
      <Row>
        <Col xs="auto" sm="auto">
          <img src={connection.photoURL || 'https://via.placeholder.com/150'} alt="avatar" className="rounded-circle" width="100" height="100" />
        </Col>
        <Col xs="auto" sm="auto">
          <CardTitle>{connection.displayName}</CardTitle>
          {/* <CardSubtitle>
            Mutual connections <Badge color="info">{mutualConnections}</Badge>
          </CardSubtitle>
          <CardSubtitle>
            Total connections <Badge color="info">{totalConnections}</Badge>
          </CardSubtitle> */}
          {connection.externalOrg && <Badge color="warning">Work/School</Badge>}
        </Col>
        <Col xs={12} sm="auto">
          <div style={{ display: 'flex', flex:1, flexDirection: "row-reverse"}}>
            <Button color="danger" onClick={() => bubbleService.removeFromBubble(user, connection)}>Delete</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConnectionCard;
