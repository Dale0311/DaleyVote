import { Link } from 'react-router-dom';
import Card from '../components/Card';
import JoinRoom from '../components/JoinRoom';
import { useCurrentUserStore } from '../store/store';
import { io } from 'socket.io-client';

const names = ['Dale', 'KC', 'Justine'];
const Home = () => {
  // socket
  const socket = io('http://localhost:5300');
  socket.on('connect', () => {
    console.log(`user: ${socket.id} is connected to the socket`);
  });

  return (
    <div className="border">
      {/* crud room */}
      <div className="flex space-x-2">
        <Link
          className=" py-2 px-6 text-white bg-blue-500 hover:bg-blue-600 rounded font-body"
          to={'create'}
        >
          create room +
        </Link>
        <JoinRoom />
      </div>

      {/* Cards */}
      <div className="flex space-x-2 justify-center my-4">
        {names.map((name) => (
          <Card key={name} name={name} />
        ))}
      </div>
    </div>
  );
};

export default Home;
