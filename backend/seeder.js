import dns from 'node:dns/promises';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import products from './data/products.js';

dns.setServers(['1.1.1.1', '1.0.0.1']);
dotenv.config({ quiet: true });

await connectDB();

const getSeedAdmin = async () => {
  const existingAdmin = await User.findOne({ isAdmin: true });

  if (existingAdmin) {
    return existingAdmin;
  }

  return User.create({
    name: 'Admin Toyland',
    email: 'admin@toyland.com',
    password: 'admin123',
    isAdmin: true,
  });
};

const importData = async () => {
  try {
    await Product.deleteMany();

    const adminUser = await getSeedAdmin();
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser._id,
    }));

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
