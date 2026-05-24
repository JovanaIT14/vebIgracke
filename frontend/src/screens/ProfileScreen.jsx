import { Alert, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();

  const logoutHandler = () => {
    logout();
    navigate('/prijava');
  };

  if (!currentUser) {
    return (
      <>
        <Alert variant="info">Prijavite se da biste vidjeli profil.</Alert>
        <LinkContainer to="/prijava">
          <Button variant="primary">Prijava</Button>
        </LinkContainer>
      </>
    );
  }

  return (
    <Row>
      <Col lg={4}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Profil korisnika</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Ime: {currentUser.name}</ListGroup.Item>
              <ListGroup.Item>Email: {currentUser.email}</ListGroup.Item>
            </ListGroup>
            <Button variant="outline-primary" className="mt-3" onClick={logoutHandler}>
              Odjavi se
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={8}>
        <h1 className="h3 mb-3">Prethodne narudžbine</h1>
        {currentUser.orders.length === 0 ? (
          <Alert variant="info">Nemate prethodnih narudžbina.</Alert>
        ) : (
          <ListGroup>
            {currentUser.orders.map((order) => (
              <ListGroup.Item key={order.id}>
                <Row>
                  <Col md={5}>
                    <strong>Proizvodi:</strong> {order.items.join(', ')}
                  </Col>
                  <Col md={3}>
                    <strong>Status:</strong> {order.status}
                  </Col>
                  <Col md={4}>
                    <strong>Ukupno:</strong> {order.totalPrice.toFixed(2)} KM
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
