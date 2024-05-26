import React, { useEffect, useState } from 'react';
import { useCurrentUserStore } from '../store/currentUserSlice';
import { typeSafeDestructureOfCurrentUser } from '../utils/typeSafeDestructureOfCurrentUser';
import { socket } from '../socket/index.socket';

const useRoom = (code: string) => {
  //states
  const [roomConfig, setRoomConfig] = useState({});
  const [error, setError] = useState('');

  // get the current user id
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const { _id } = typeSafeDestructureOfCurrentUser(currentUser) ?? {};

  useEffect(() => {
    socket.emit('join-room', code, _id, (err: Error, response: object) => {
      if (err) {
        setError(err.message);
      }
      setRoomConfig(response);
    });
  }, [code, _id]);

  return { roomConfig, error };
};

export default useRoom;
