import { api } from '../api/index.api';

const JoinRoom = () => {
  const handleClick = async () => {
    try {
      const data = await api.get('/test');
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
