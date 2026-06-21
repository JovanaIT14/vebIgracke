import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Alert, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id } = useParams();
  const { order: localOrder } = useCart();
  const { data: backendOrder, refetch, isError } = useGetOrderDetailsQuery(id, {
    skip: !id,
  });
  const { data: paypal, isError: isPaypalError, isLoading: isPaypalLoading } = useGetPaypalClientIdQuery(undefined, {
    skip: !id,
  });
  const [payOrder] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const order = backendOrder || localOrder;

  useEffect(() => {
    if (paypal?.clientId && order?.paymentMethod === 'PayPal' && !order?.isPaid) {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({
        type: 'setLoadingStatus',
        value: 'pending',
      });
    }
  }, [order, paypal, paypalDispatch]);

  if (id && isError) {
    return (
      <>
        <Alert variant="warning">Narudzbina nije pronadjena.</Alert>
        <LinkContainer to="/">
          <Button variant="primary">Nazad na katalog</Button>
        </LinkContainer>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Alert variant="info">Jos nemate potvrdjenu narudzbinu.</Alert>
        <LinkContainer to="/">
          <Button variant="primary">Nazad na katalog</Button>
        </LinkContainer>
      </>
    );
  }

  const orderItems = order.orderItems || order.items;
  const shippingAddress = order.shippingAddress;
  const totalPrice = order.totalPrice;
  const showPaypal = id && order.paymentMethod === 'PayPal' && !order.isPaid;
  const paypalUnavailable = showPaypal && !isPaypalLoading && (!paypal?.clientId || isPaypalError);

  const createPaypalOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toFixed(2),
          },
        },
      ],
    });

  const approvePaypalOrder = (data, actions) =>
    actions.order.capture().then(async (details) => {
      await payOrder({ orderId: id, details }).unwrap();
      refetch();
    });

  return (
    <>
      <Alert variant="success">Narudzbina je uspjesno potvrdjena.</Alert>
      <Row>
        <Col lg={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pregled narudzbine</Card.Title>
              <ListGroup variant="flush">
                {orderItems.map((item) => {
                  const name = item.name || item.naziv;
                  const quantity = item.qty || item.quantity;
                  const price = item.price || item.cijena;
                  const productId = item.product || item.id;

                  return (
                    <ListGroup.Item key={productId}>
                      {productId ? <Link to={`/proizvod/${productId}`}>{name}</Link> : name} x {quantity} ={' '}
                      {(price * quantity).toFixed(2)} KM
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Dostava</Card.Title>
              <Card.Text className="mb-1">{shippingAddress.fullName || order.user?.name}</Card.Text>
              <Card.Text className="mb-1">{shippingAddress.address}</Card.Text>
              <Card.Text className="mb-1">
                {shippingAddress.postalCode} {shippingAddress.city}
              </Card.Text>
              <Card.Text>{shippingAddress.phone}</Card.Text>
              <Card.Text className="mb-1">Placanje: {order.paymentMethod}</Card.Text>
              {order.isPaid && <Card.Text>Status placanja: Placeno</Card.Text>}
              {order.isDelivered && <Card.Text>Status isporuke: Isporuceno</Card.Text>}
              <h3 className="h5">Ukupno: {totalPrice.toFixed(2)} KM</h3>
              {paypalUnavailable && (
                <Alert variant="warning" className="mt-3">
                  PayPal trenutno nije dostupan.
                </Alert>
              )}
              {showPaypal && paypal?.clientId && (
                <div className="mt-3">
                  {isPending ? (
                    <Alert variant="info">PayPal se ucitava...</Alert>
                  ) : (
                    <PayPalButtons createOrder={createPaypalOrder} onApprove={approvePaypalOrder} />
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
