import { useParams } from 'react-router-dom';
import useRoom from '../hooks/useRoom';
import typeSafeDestructureForRoomConfig from '../utils/typeSafeDestructureForRoomConfig';
import Duration from '../components/Room/Duration';
import Position from '../components/Room/Position';

const Room = () => {
  // create useRoom
  const { code } = useParams();

  const { loading, roomConfig } = useRoom(code ?? '');
  const { expiration, title, createdById, votingDetails } =
    typeSafeDestructureForRoomConfig(roomConfig) ?? {};

  const renderPositions = votingDetails?.map((pos) => (
    <Position position={pos} />
  ));
  return (
    <div>
      <div className="flex space-x-4 items-center">
        <h1 className="font-body text-lg ">{title}</h1>
        <Duration targetDate={expiration || ''} />
      </div>
      {loading ? <p>fetching configuration...</p> : <p>fetched data</p>}
    </div>
  );
};

export default Room;
