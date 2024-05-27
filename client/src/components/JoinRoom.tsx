import { useState } from 'react';
import { socket } from '../socket/index.socket';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [code, setCode] = useState<string>('');
  const nav = useNavigate();
  const handleClick = () => {
    if (!code) return;
    nav(`rooms/${code}`);
  };
  return (
    <div>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="p-1 border"
      />
      <button
        className={`py-2 px-6 text-white bg-blue-500 hover:bg-blue-600 rounded font-body disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-500`}
        disabled={!Boolean(code)}
        onClick={handleClick}
      >
        join room +
      </button>
    </div>
  );
};

export default JoinRoom;
