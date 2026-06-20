import { Alert, Button, Table } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import {
  useDeliverOrderMutation,
  useGetOrdersQuery,
} from '../slices/ordersApiSlice';

const AdminOrderListScreen = () => {
  const { currentUser } = useUser();
  const { data: backendOrders } = useGetOrdersQuery(undefined, {
    skip: !currentUser?.isAdmin,
  });
  const [deliverOrder] = useDeliverOrderMutation();
  const orders = backendOrders || [];

  const deliverHandler = async (id) => {
    await deliverOrder(id);
  };

  if (!currentUser || !currentUser.isAdmin) {
    return <Alert variant="danger">Nemate pristup administratorskom dijelu.</Alert>;
  }

  return (
    <>
      <h1 className="h3 mb-3">Admin narudzbine</h1>
      {backendOrders && orders.length === 0 ? (
        <Alert variant="info">Nema narudzbina za prikaz.</Alert>
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
              <tr key={item._id}>
                <td>{item.user?.name || 'Kupac'}</td>
                <td>{item.orderItems.map((orderItem) => `${orderItem.name} x ${orderItem.qty}`).join(', ')}</td>
                <td>
                  {item.isDelivered ? (
                    'Isporucena'
                  ) : (
                    <Button variant="outline-primary" size="sm" onClick={() => deliverHandler(item._id)}>
                      Oznaci isporuceno
                    </Button>
                  )}
                </td>
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
