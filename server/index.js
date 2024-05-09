// packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// local imports
import connectDb from './config/mongoDb.js';
import userRoute from './routes/user.route.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { corsOptions } from './config/cors.js';

const PORT = 5300;
const app = express();
dotenv.config();
connectDb();

// middlewares
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1/user', userRoute);
app.get('/api/v1/test', (req, res) => {
  console.log('hey this endpoint got called');
  res.json({ message: 'hey' });
});
// app.use('/api/v1/room', roomRoute);
app.use(errorHandler);

// listen
app.listen(process.env.PORT || PORT, () =>
  console.log(`Server is running on Port ${PORT}`)
);