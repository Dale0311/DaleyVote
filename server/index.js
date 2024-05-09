// packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// local imports
import connectDb from './config/mongoDb.js';
import userRoute from './routes/user.route.js';
import { errorHandler, requireToken } from './middlewares/index.middleware.js';
import { corsOptions } from './config/cors.js';
import { app, httpServer } from './socket/index.socket.js';

const PORT = 5300;
dotenv.config();
connectDb();

// middlewares
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1/user', userRoute);

app.use(requireToken);
app.get('/api/v1/test', (req, res) => {
  console.log(req?.currentUser);
  res.json({ message: 'hey' });
});
// app.use('/api/v1/room', roomRoute);
app.use(errorHandler);

// listen
httpServer.listen(process.env.PORT || PORT, () =>
  console.log(`Server is running on Port ${PORT}`)
);
