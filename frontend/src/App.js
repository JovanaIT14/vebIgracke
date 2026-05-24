import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
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
              <Route path="checkout" element={<CheckoutScreen />} />
              <Route path="narudzbina" element={<OrderScreen />} />
              <Route path="prijava" element={<LoginScreen />} />
              <Route path="registracija" element={<RegisterScreen />} />
              <Route path="profil" element={<ProfileScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
