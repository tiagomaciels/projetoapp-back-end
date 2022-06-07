import './database';
import 'reflect-metadata';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { routes } from './routes';

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(port, () => console.log(`The server is running on port ${port}`));
