import products from './products';

export const getProducts = () => {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : products;
};

export const saveProducts = (items) => {
  localStorage.setItem('products', JSON.stringify(items));
};
