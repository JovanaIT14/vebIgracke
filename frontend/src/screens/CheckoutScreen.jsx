import { useState } from 'react';
import { Alert, Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';

const CheckoutScreen = () => {
  const { cartItems, shippingAddress, saveShippingAddress, placeOrder } = useCart();
  const { currentUser } = useUser();
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('Placanje pouzecem');
  const totalPrice = cartItems.reduce((total, item) => total + item.cijena * item.quantity, 0);

  const submitHandler = async (event) => {
    event.preventDefault();
    const newAddress = { fullName, address, city, postalCode, phone };
    saveShippingAddress(newAddress);

    if (currentUser?.token) {
      try {
        const createdOrder = await createOrder({
          orderItems: cartItems.map((item) => ({
            name: item.naziv,
            qty: item.quantity,
            image: item.slika,
            price: item.cijena,
            product: item.backendProduct || item.id,
          })),
          shippingAddress: {
            ...newAddress,
            country: 'Bosna i Hercegovina',
          },
          paymentMethod,
          itemsPrice: totalPrice,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice,
        }).unwrap();
        placeOrder(newAddress, paymentMethod, false);
        navigate(`/narudzbina/${createdOrder._id}`);
        return;
      } catch (apiError) {
      }
    }

    placeOrder(newAddress, paymentMethod, false);
    navigate('/narudzbina');
  };

  const paymentChangeHandler = (event) => {
    setPaymentMethod(event.target.value);
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
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Ime i prezime</Form.Label>
            <Form.Control value={fullName} onChange={(event) => setFullName(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Adresa</Form.Label>
            <Form.Control value={address} onChange={(event) => setAddress(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Grad</Form.Label>
            <Form.Control value={city} onChange={(event) => setCity(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postanski broj</Form.Label>
            <Form.Control value={postalCode} onChange={(event) => setPostalCode(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefon</Form.Label>
            <Form.Control value={phone} onChange={(event) => setPhone(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nacin placanja</Form.Label>
            <Form.Check
              type="radio"
              id="cashOnDelivery"
              label="Placanje pouzecem"
              name="paymentMethod"
              value="Placanje pouzecem"
              checked={paymentMethod === 'Placanje pouzecem'}
              onChange={paymentChangeHandler}
            />
            <Form.Check
              type="radio"
              id="paypal"
              label="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={paymentChangeHandler}
            />
          </Form.Group>
          {paymentMethod === 'PayPal' && (
            <Alert variant="info">PayPal placanje ce biti dostupno nakon potvrde narudzbine.</Alert>
          )}
          <Button type="submit" variant="primary">
            Potvrdi narudzbinu
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
