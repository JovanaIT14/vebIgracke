import { Alert, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { useGetProfileQuery, useLogoutMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();
  const [logoutApi] = useLogoutMutation();
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !currentUser?.token,
  });
  const { data: backendOrders } = useGetMyOrdersQuery(undefined, {
    skip: !currentUser?.token,
  });
  const profileUser = profileData || currentUser;
  const orders = backendOrders || currentUser?.orders || [];

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
    } catch (apiError) {
    }

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
              <ListGroup.Item>Ime: {profileUser.name}</ListGroup.Item>
              <ListGroup.Item>Email: {profileUser.email}</ListGroup.Item>
            </ListGroup>
            <Button variant="outline-primary" className="mt-3" onClick={logoutHandler}>
              Odjavi se
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={8}>
        <h1 className="h3 mb-3">Prethodne narudzbine</h1>
        {orders.length === 0 ? (
          <Alert variant="info">Nemate prethodnih narudzbina.</Alert>
        ) : (
          <ListGroup>
            {orders.map((order) => (
              <ListGroup.Item key={order._id || order.id}>
                <Row>
                  <Col md={5}>
                    <strong>Proizvodi:</strong>{' '}
                    {order.orderItems
                      ? order.orderItems.map((item) => `${item.name} x ${item.qty}`).join(', ')
                      : order.items.join(', ')}
                  </Col>
                  <Col md={3}>
                    <strong>Status:</strong> {order.status || (order.isDelivered ? 'Isporuceno' : 'U obradi')}
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
