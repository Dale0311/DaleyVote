import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import whiteList from "../config/whiteList.js";
import Room from "../models/Rooms.model.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: whiteList } });

io.on("connection", (socket) => {
  socket.on("join-room", async (code, userId, callback) => {
    const roomExist = await Room.findOne({ code });
    if (roomExist) {
      // if the client doesn't exist in the participants array, append it
      if (
        !roomExist.participants.some(
          (participant) => participant.userId === userId
        )
      ) {
        console.log("user doesn't exist in this room");
        roomExist.participants.push({ userId, socketId: socket.id });
        await roomExist.save();
      }

      socket.join(code);
      callback({ success: true, ...roomExist._doc });
    } else {
      // room doesn't exist
      callback({ success: false });
    }
  });

  socket.on("create-room", () => {
    socket;
  });
});

export { app, httpServer, io };
