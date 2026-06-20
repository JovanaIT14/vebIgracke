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
  const [paymentMethod, setPaymentMethod] = useState('Plaćanje pouzećem');
  const [paypalPaid, setPaypalPaid] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + item.cijena * item.quantity, 0);

  const submitHandler = async (event) => {
    event.preventDefault();
    const newAddress = { fullName, address, city, postalCode, phone };
    const isPaid = paymentMethod === 'PayPal' ? paypalPaid : false;
    saveShippingAddress(newAddress);

    if (currentUser?.token) {
      try {
        await createOrder({
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
      } catch (apiError) {
      }
    }

    placeOrder(newAddress, paymentMethod, isPaid);
    navigate('/narudzbina');
  };

  const paymentChangeHandler = (event) => {
    setPaymentMethod(event.target.value);
    setPaypalPaid(false);
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
            <Form.Label>Poštanski broj</Form.Label>
            <Form.Control value={postalCode} onChange={(event) => setPostalCode(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefon</Form.Label>
            <Form.Control value={phone} onChange={(event) => setPhone(event.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Način plaćanja</Form.Label>
            <Form.Check
              type="radio"
              id="cashOnDelivery"
              label="Plaćanje pouzećem"
              name="paymentMethod"
              value="Plaćanje pouzećem"
              checked={paymentMethod === 'Plaćanje pouzećem'}
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
            <div className="mb-3">
              {paypalPaid ? (
                <Alert variant="success">PayPal plaćanje je uspješno simulirano.</Alert>
              ) : (
                <Button type="button" variant="outline-primary" onClick={() => setPaypalPaid(true)}>
                  Plati putem PayPal-a
                </Button>
              )}
            </div>
          )}
          <Button type="submit" variant="primary" disabled={paymentMethod === 'PayPal' && !paypalPaid}>
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
