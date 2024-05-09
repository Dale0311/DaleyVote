import { Link } from 'react-router-dom';
import Card from '../components/Card';
import JoinRoom from '../components/JoinRoom';
import { useCurrentUserStore } from '../store/store';

const names = ['Dale', 'KC', 'Justine'];
const Home = () => {
  const token = useCurrentUserStore((state) => state.token);
  console.log(token);
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
