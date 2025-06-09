import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {router} from './Routes/pdf.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount PDF routes
app.use('/api/pdf',router);

app.listen(5000, () => {
  console.log('App running on port 5000');
});