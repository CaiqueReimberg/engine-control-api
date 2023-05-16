import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';
import cors from 'cors';

const app = express();
app.use(cors());

mongoose.connect(
  'mongodb+srv://caiquecreimberg:tzVv7tkdb7I1e0or@enginecontrol.5ni6ozq.mongodb.net/?retryWrites=true&w=majority',
);

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('Server is listening on port 3333'));
