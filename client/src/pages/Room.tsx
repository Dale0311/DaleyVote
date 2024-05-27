import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import typeSafeDestructureForRoomConfig from "../utils/typeSafeDestructureForRoomConfig";

const Room = () => {
  // create useRoom
  const { code } = useParams();

  const { loading, roomConfig } = useRoom(code ?? "");
  const { _id } = typeSafeDestructureForRoomConfig(roomConfig) ?? {};

  return (
    <div>
      {loading ? <p>fetching configuration...</p> : <p>fetched data</p>}
    </div>
  );
};

export default Room;
