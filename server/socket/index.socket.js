import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import whiteList from '../config/whiteList.js';
import Room from '../models/Rooms.model.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: whiteList } });

io.on('connection', (socket) => {
  socket.on('join-room', async (room, userId, callback) => {
    const roomExist = await Room.findOne({ code: room });

    if (roomExist) {
      // if the client doesn't exist in the participants array, append it
      if (
        !roomExist.participants.some(
          (participant) => participant.userId === userId
        )
      ) {
        roomExist.participants.push({ userId, socketId: socket.id });
        await roomExist.save();
      }
      socket.join(room);
      io.to(room).emit('user-join', userId);
      callback(roomExist);
    } else {
      // room doesn't exist
      callback({ status: "room doesn't exist " });
    }
  });

  socket.on('create-room', () => {
    socket;
  });
});

export { app, httpServer, io };
