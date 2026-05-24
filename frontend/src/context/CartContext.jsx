import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const getStoredValue = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => getStoredValue('cartItems', []));
  const [shippingAddress, setShippingAddress] = useState(() => getStoredValue('shippingAddress', {}));
  const [order, setOrder] = useState(() => getStoredValue('order', null));

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order));
  }, [order]);

  const addToCart = (product, quantity) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.brojNaStanju) }
            : item
        );
      }

      return [...items, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (id, quantity) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Number(quantity) } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const saveShippingAddress = (address) => {
    setShippingAddress(address);
  };

  const placeOrder = (address) => {
    const newOrder = {
      items: cartItems,
      shippingAddress: address,
      totalPrice: cartItems.reduce((total, item) => total + item.cijena * item.quantity, 0),
    };

    setOrder(newOrder);
    setCartItems([]);

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        shippingAddress,
        order,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        saveShippingAddress,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
