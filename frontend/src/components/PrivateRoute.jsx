import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = () => {
  const { currentUser } = useUser();

  return currentUser ? <Outlet /> : <Navigate to="/prijava" replace />;
};

export default PrivateRoute;
