import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AdminRoute = () => {
  const { currentUser } = useUser();

  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/prijava" replace />;
};

export default AdminRoute;
