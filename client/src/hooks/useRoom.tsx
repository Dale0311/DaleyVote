import { useEffect, useState } from 'react';
import { useCurrentUserStore } from '../store/currentUserSlice';
import { typeSafeDestructureOfCurrentUser } from '../utils/typeSafeDestructureOfCurrentUser';
import { socket } from '../socket/index.socket';
import { TRoomConfig } from '../types';

const useRoom = (code: string) => {
  //states
  const [roomConfig, setRoomConfig] = useState<TRoomConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // get the current user id
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const { _id } = typeSafeDestructureOfCurrentUser(currentUser) ?? {};

  useEffect(() => {
    const joinRoom = async () => {
      setLoading(true);
      try {
        const res = await socket.emitWithAck('join-room', code, _id);
        setRoomConfig(res);
      } catch (error) {
        console.log('error');
      } finally {
        setLoading(false);
      }
    };
    joinRoom();
  }, [code, _id]);

  return { roomConfig, error, loading };
};

export default useRoom;
