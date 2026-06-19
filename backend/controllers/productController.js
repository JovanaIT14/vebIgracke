import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
    return;
  }

  res.status(404);
  throw new Error('Resource not found');
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name || 'Nova igracka',
    image: req.body.image || '/images/sample.jpg',
    description: req.body.description || 'Opis proizvoda',
    brand: req.body.brand || 'Toyland',
    category: req.body.category || 'Igracke',
    ageRange: req.body.ageRange || '3+ godine',
    material: req.body.material || 'Plastika',
    price: req.body.price ?? 0,
    countInStock: req.body.countInStock ?? 0,
    rating: req.body.rating ?? 0,
    numReviews: req.body.numReviews ?? 0,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name ?? product.name;
    product.image = req.body.image ?? product.image;
    product.description = req.body.description ?? product.description;
    product.brand = req.body.brand ?? product.brand;
    product.category = req.body.category ?? product.category;
    product.ageRange = req.body.ageRange ?? product.ageRange;
    product.material = req.body.material ?? product.material;
    product.price = req.body.price ?? product.price;
    product.countInStock = req.body.countInStock ?? product.countInStock;
    product.rating = req.body.rating ?? product.rating;
    product.numReviews = req.body.numReviews ?? product.numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
    return;
  }

  res.status(404);
  throw new Error('Resource not found');
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product removed' });
    return;
  }

  res.status(404);
  throw new Error('Resource not found');
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
