export const getStoredValue = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const saveCartState = (state) => {
  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
  localStorage.setItem('order', JSON.stringify(state.order));
};
