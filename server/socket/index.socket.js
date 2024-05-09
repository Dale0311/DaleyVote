import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import whiteList from '../config/whiteList.js';

export const app = express();
export const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: whiteList } });

// socket logic goes here
io.on('connection', (socket) => {
  console.log(`Welcome user:${socket.id}`);
});
