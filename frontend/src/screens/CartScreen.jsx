import { Alert, Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.cijena * item.quantity, 0);

  return (
    <Row>
      <Col lg={8}>
        <h1 className="h3 mb-3">Korpa</h1>
        {cartItems.length === 0 ? (
          <>
            <Alert variant="info">Vaša korpa je trenutno prazna.</Alert>
            <LinkContainer to="/">
              <Button variant="outline-primary">Nazad na početnu</Button>
            </LinkContainer>
          </>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id} className="cart-item">
                <Row className="align-items-center g-3">
                  <Col xs={3} md={2}>
                    <Image src={item.slika} alt={item.naziv} fluid rounded />
                  </Col>
                  <Col xs={9} md={4}>
                    <Link to={`/proizvod/${item.id}`} className="fw-semibold">
                      {item.naziv}
                    </Link>
                    <div className="text-muted small">{item.cijena.toFixed(2)} KM</div>
                  </Col>
                  <Col xs={7} md={3}>
                    <Form.Select
                      value={item.quantity}
                      onChange={(event) => updateCartQuantity(item.id, event.target.value)}
                    >
                      {[...Array(item.brojNaStanju).keys()].map((number) => (
                        <option key={number + 1} value={number + 1}>
                          {number + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={3} md={2} className="fw-semibold">
                    {(item.cijena * item.quantity).toFixed(2)} KM
                  </Col>
                  <Col xs={2} md={1} className="text-end">
                    <Button variant="light" onClick={() => removeFromCart(item.id)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col lg={4}>
        <Card>
          <Card.Body>
            <Card.Title>Pregled narudžbine</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Ukupno artikala: {totalItems}</ListGroup.Item>
              <ListGroup.Item>Ukupna cijena: {totalPrice.toFixed(2)} KM</ListGroup.Item>
            </ListGroup>
            <LinkContainer to="/checkout">
              <Button variant="primary" className="w-100 mt-3" disabled={cartItems.length === 0}>
                Nastavi na poručivanje
              </Button>
            </LinkContainer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
