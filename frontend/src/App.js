import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import RegisterScreen from './screens/RegisterScreen';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path="korpa" element={<CartScreen />} />
          <Route path="prijava" element={<LoginScreen />} />
          <Route path="registracija" element={<RegisterScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
