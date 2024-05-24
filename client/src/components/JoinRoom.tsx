import { socket } from '../socket/index.socket';

const JoinRoom = () => {
  const code =
    'c926af60705e41e0ac1d4c7a64212184a0b06460c952eb42b86a933d3cf7cc07';
  const handleClick = async () => {
    try {
      socket.emit('join-room', code, 'dale');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input type="text" className="p-1 border" />
      <button
        className=" py-2 px-6 text-white bg-blue-500 hover:bg-blue-600 rounded font-body"
        onClick={handleClick}
      >
        join room +
      </button>
    </div>
  );
};

export default JoinRoom;
