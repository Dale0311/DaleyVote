import React, { useEffect, useState } from 'react';
import { useCurrentUserStore } from '../store/currentUserSlice';
import { typeSafeDestructureOfCurrentUser } from '../utils/typeSafeDestructureOfCurrentUser';
import { socket } from '../socket/index.socket';

const useRoom = (code: string) => {
  const [roomConfig, setRoomConfig] = useState();
  const [error, setError] = useState('');
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const { _id } = typeSafeDestructureOfCurrentUser(currentUser) ?? {};
  useEffect(() => {
    socket.emit('join-room', code, _id, (err, response) => {
      if (err) {
        setError(err.message);
      }
      setRoomConfig(response);
    });

    // return () => socket.disconnect();
  }, [code, _id]);

  return { roomConfig, error };
};

export default useRoom;
