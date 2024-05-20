// packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// local imports
import connectDb from './config/mongoDb.js';
import userRoute from './routes/user.route.js';
import roomRoute from './routes/room.route.js';
import { errorHandler, requireToken } from './middlewares/index.middleware.js';
import { corsOptions } from './config/cors.js';
import { app, httpServer } from './socket/index.socket.js';
import { configCloudinary } from './config/cloudinary.js';

const PORT = 5300;
dotenv.config();
connectDb();
configCloudinary();
// middlewares
// app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(cors());
// routes
app.use('/api/v1/user', userRoute);

// app.use(requireToken);
app.use('/api/v1/room', roomRoute);
app.use(errorHandler);

// listen
httpServer.listen(process.env.PORT || PORT, () =>
  console.log(`Server is running on Port ${PORT}`)
);
