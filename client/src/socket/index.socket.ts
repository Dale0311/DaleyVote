import { Socket, io } from 'socket.io-client';

export const socket: Socket = io('http://localhost:5300', { query: {} });

export const disconnectSocket = () => {
  socket.disconnect();
};
