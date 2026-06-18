import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart as addToCartAction,
  placeOrder as placeOrderAction,
  removeFromCart as removeFromCartAction,
  saveShippingAddress as saveShippingAddressAction,
  updateCartQuantity as updateCartQuantityAction,
} from '../slices/cartSlice';

export const CartProvider = ({ children }) => {
  return children;
};

export const useCart = () => {
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, order } = useSelector((state) => state.cart);

  const addToCart = (product, quantity) => {
    dispatch(addToCartAction({ product, quantity }));
  };

  const updateCartQuantity = (id, quantity) => {
    dispatch(updateCartQuantityAction({ id, quantity }));
  };

  const removeFromCart = (id) => {
    dispatch(removeFromCartAction(id));
  };

  const saveShippingAddress = (address) => {
    dispatch(saveShippingAddressAction(address));
  };

  const placeOrder = (address, paymentMethod, isPaid) => {
    const newOrder = {
      items: cartItems,
      shippingAddress: address,
      paymentMethod,
      isPaid,
      totalPrice: cartItems.reduce((total, item) => total + item.cijena * item.quantity, 0),
    };

    dispatch(placeOrderAction({ address, paymentMethod, isPaid }));

    return newOrder;
  };

  return {
    cartItems,
    shippingAddress,
    order,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    saveShippingAddress,
    placeOrder,
  };
};
