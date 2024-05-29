import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import typeSafeDestructureForRoomConfig from "../utils/typeSafeDestructureForRoomConfig";
import Duration from "../components/Room/Duration";
import Position from "../components/Room/Position";
import { useCurrentUserStore } from "../store/currentUserSlice";
import { typeSafeDestructureOfCurrentUser } from "../utils/typeSafeDestructureOfCurrentUser";

const Room = () => {
  // create useRoom
  const { code } = useParams();
  const { loading, roomConfig } = useRoom(code ?? "");
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const { _id } = typeSafeDestructureOfCurrentUser(currentUser) ?? {};

  const { expiration, title, votingDetails, participants } =
    typeSafeDestructureForRoomConfig(roomConfig) ?? {};

  const currentUserVotes = participants?.find((p) => p.userId === _id);

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
