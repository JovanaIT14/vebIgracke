import { createSlice } from '@reduxjs/toolkit';
import { getStoredValue, saveCartState } from '../utils/cartUtils';

const initialState = {
  cartItems: getStoredValue('cartItems', []),
  shippingAddress: getStoredValue('shippingAddress', {}),
  order: getStoredValue('order', null),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, product.brojNaStanju);
      } else {
        state.cartItems.push({ ...product, quantity });
      }

      saveCartState(state);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((cartItem) => cartItem.id === id);

      if (item) {
        item.quantity = Number(quantity);
      }

      saveCartState(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      saveCartState(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      saveCartState(state);
    },
    placeOrder: (state, action) => {
      const { address, paymentMethod, isPaid } = action.payload;

      state.order = {
        items: state.cartItems,
        shippingAddress: address,
        paymentMethod,
        isPaid,
        totalPrice: state.cartItems.reduce((total, item) => total + item.cijena * item.quantity, 0),
      };
      state.cartItems = [];

      saveCartState(state);
    },
  },
});

export const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
  saveShippingAddress,
  placeOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
