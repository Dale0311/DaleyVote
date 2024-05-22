import { io } from 'socket.io-client';
interface IProps {
  (data: unknown): void;
}
const socket = io('http://localhost:5300', { query: {} });
export const emitEvent = (event: string, data: unknown) => {
  socket.emit(event, data);
};

export const subscribeToEvent = (event: string, callback: IProps) => {
  socket.on(event, callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};
