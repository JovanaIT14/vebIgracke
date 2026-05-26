import { Alert, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../context/CartContext';

const OrderScreen = () => {
  const { order } = useCart();

  if (!order) {
    return (
      <>
        <Alert variant="info">Još nemate potvrđenu narudžbinu.</Alert>
        <LinkContainer to="/">
          <Button variant="primary">Nazad na katalog</Button>
        </LinkContainer>
      </>
    );
  }

  return (
    <>
      <Alert variant="success">Narudžbina je uspješno potvrđena.</Alert>
      <Row>
        <Col lg={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pregled narudžbine</Card.Title>
              <ListGroup variant="flush">
                {order.items.map((item) => (
                  <ListGroup.Item key={item.id}>
                    {item.naziv} x {item.quantity} = {(item.cijena * item.quantity).toFixed(2)} KM
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Dostava</Card.Title>
              <Card.Text className="mb-1">{order.shippingAddress.fullName}</Card.Text>
              <Card.Text className="mb-1">{order.shippingAddress.address}</Card.Text>
              <Card.Text className="mb-1">
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </Card.Text>
              <Card.Text>{order.shippingAddress.phone}</Card.Text>
              <h3 className="h5">Ukupno: {order.totalPrice.toFixed(2)} KM</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
