import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import typeSafeDestructureForRoomConfig from "../utils/typeSafeDestructureForRoomConfig";
import Duration from "../components/Room/Duration";
import Position from "../components/Room/Position";

const Room = () => {
  // create useRoom
  const { code } = useParams();

  const { loading, roomConfig } = useRoom(code ?? "");
  const { expiration, title, votingDetails } =
    typeSafeDestructureForRoomConfig(roomConfig) ?? {};

  const renderPositions = votingDetails?.map((pos) => (
    <Position key={pos._id} position={pos} />
  ));
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="font-body text-xl">{title}</h1>
        <Duration targetDate={expiration || ""} />
      </div>
      <div>{renderPositions}</div>
      {loading ? <p>fetching configuration...</p> : <p>fetched data</p>}
    </div>
  );
};

export default Room;
