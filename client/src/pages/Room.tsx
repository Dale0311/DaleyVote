import { useEffect, useState } from 'react';
import { socket } from '../socket/index.socket';
import { useParams } from 'react-router-dom';
import useRoom from '../hooks/useRoom';

const Room = () => {
  // create useRoom
  const { code } = useParams();
  const roomConfig = useRoom(code ?? '');
  console.log(roomConfig);
  
  return <div>hello world</div>;
};

export default Room;
