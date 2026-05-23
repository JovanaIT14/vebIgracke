import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CartScreen = () => {
  return (
    <Row>
      <Col lg={8}>
        <h1 className="h3 mb-3">Korpa</h1>
        <Alert variant="info">Vaša korpa je trenutno prazna.</Alert>
        <LinkContainer to="/">
          <Button variant="outline-primary">Nazad na početnu</Button>
        </LinkContainer>
      </Col>
      <Col lg={4}>
        <Card>
          <Card.Body>
            <Card.Title>Pregled narudžbine</Card.Title>
            <Card.Text className="text-muted">Ukupno artikala: 0</Card.Text>
            <Button variant="primary" disabled>
              Nastavi kupovinu
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
