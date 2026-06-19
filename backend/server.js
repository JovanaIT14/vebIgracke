import dns from 'node:dns/promises';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dns.setServers(['1.1.1.1', '1.0.0.1']);
dotenv.config({ quiet: true });

const port = process.env.PORT || 5000;

await connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
