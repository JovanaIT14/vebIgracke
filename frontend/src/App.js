import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import AdminProductEditScreen from './screens/AdminProductEditScreen';
import AdminProductListScreen from './screens/AdminProductListScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import './App.css';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomeScreen />} />
              <Route path="proizvod/:id" element={<ProductScreen />} />
              <Route path="korpa" element={<CartScreen />} />
              <Route path="prijava" element={<LoginScreen />} />
              <Route path="registracija" element={<RegisterScreen />} />
              <Route element={<PrivateRoute />}>
                <Route path="checkout" element={<CheckoutScreen />} />
                <Route path="narudzbina" element={<OrderScreen />} />
                <Route path="narudzbina/:id" element={<OrderScreen />} />
                <Route path="profil" element={<ProfileScreen />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="admin/proizvodi" element={<AdminProductListScreen />} />
                <Route path="admin/proizvodi/novi" element={<AdminProductEditScreen />} />
                <Route path="admin/proizvodi/:id/uredi" element={<AdminProductEditScreen />} />
                <Route path="admin/narudzbine" element={<AdminOrderListScreen />} />
              </Route>
              <Route path="*" element={<NotFoundScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
