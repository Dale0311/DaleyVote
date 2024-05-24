import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import whiteList from '../config/whiteList.js';
import Room from '../models/Rooms.model.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: whiteList } });

// socket logic goes here
io.on('connection', (socket) => {
  socket.on('join-room', async (room, userId) => {
    const roomExist = await Room.findOne({ code: room });
    console.log(roomExist);
    if (roomExist) {
      // append the userId to the participant property of the roomExist
      // roomExist.
      // if successfully appended
      // return the updated data
      socket.join(room);
      // io.to(room).emit('user-joined-room', { roomData: roomExist });
      // or acknowledge
      io.to(room).emit('join-room', 'dale');
    }
  });
});

export { app, httpServer, io };
