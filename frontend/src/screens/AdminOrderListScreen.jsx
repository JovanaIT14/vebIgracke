import { Alert, Table } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const AdminOrderListScreen = () => {
  const { currentUser, userList } = useUser();
  const { order } = useCart();

  if (!currentUser || !currentUser.isAdmin) {
    return <Alert variant="danger">Nemate pristup administratorskom dijelu.</Alert>;
  }

  const userOrders = userList.flatMap((user) =>
    user.orders.map((item) => ({
      ...item,
      customer: user.name,
      itemsText: item.items.join(', '),
    }))
  );

  const localOrder = order
    ? [
        {
          id: 'lokalna',
          customer: 'Lokalni kupac',
          status: 'Potvrđena',
          totalPrice: order.totalPrice,
          itemsText: order.items.map((item) => `${item.naziv} x ${item.quantity}`).join(', '),
        },
      ]
    : [];

  const orders = [...userOrders, ...localOrder];

  return (
    <>
      <h1 className="h3 mb-3">Admin narudžbine</h1>
      {orders.length === 0 ? (
        <Alert variant="info">Nema narudžbina za prikaz.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Kupac</th>
              <th>Proizvodi</th>
              <th>Status</th>
              <th>Ukupno</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item.id}>
                <td>{item.customer}</td>
                <td>{item.itemsText}</td>
                <td>{item.status}</td>
                <td>{item.totalPrice.toFixed(2)} KM</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminOrderListScreen;
