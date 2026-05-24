import { useState } from 'react';
import { Alert, Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutScreen = () => {
  const { cartItems, shippingAddress, saveShippingAddress, placeOrder } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const totalPrice = cartItems.reduce((total, item) => total + item.cijena * item.quantity, 0);

  const submitHandler = (event) => {
    event.preventDefault();
    const newAddress = { address, city, postalCode, phone };
    saveShippingAddress(newAddress);
    placeOrder(newAddress);
    navigate('/narudzbina');
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Alert variant="info">Korpa je prazna.</Alert>
        <LinkContainer to="/">
          <Button variant="primary">Nazad na katalog</Button>
        </LinkContainer>
      </>
    );
  }

  return (
    <Row>
      <Col lg={7}>
        <h1 className="h3 mb-3">Adresa dostave</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Adresa</Form.Label>
            <Form.Control value={address} onChange={(event) => setAddress(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Grad</Form.Label>
            <Form.Control value={city} onChange={(event) => setCity(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Poštanski broj</Form.Label>
            <Form.Control value={postalCode} onChange={(event) => setPostalCode(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefon</Form.Label>
            <Form.Control value={phone} onChange={(event) => setPhone(event.target.value)} required />
          </Form.Group>
          <Button type="submit" variant="primary">
            Potvrdi narudžbinu
          </Button>
        </Form>
      </Col>
      <Col lg={5}>
        <Card>
          <Card.Body>
            <Card.Title>Pregled korpe</Card.Title>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  {item.naziv} x {item.quantity} = {(item.cijena * item.quantity).toFixed(2)} KM
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="fw-semibold">Ukupno: {totalPrice.toFixed(2)} KM</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckoutScreen;
