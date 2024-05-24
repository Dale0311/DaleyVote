import React, { useEffect, useState } from 'react';
import { useCurrentUserStore } from '../store/currentUserSlice';
import { typeSafeDestructureOfCurrentUser } from '../utils/typeSafeDestructureOfCurrentUser';
import { socket } from '../socket/index.socket';

const useRoom = (code: string) => {
  const [roomConfig, setroomConfig] = useState();
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const { _id } = typeSafeDestructureOfCurrentUser(currentUser) ?? {};
  useEffect(() => {
    socket.emit('join-room', code, _id, ()=>{
        // w acknowledge
    });
  }, []);
};

export default useRoom;
