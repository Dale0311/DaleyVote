import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import typeSafeDestructureForRoomConfig from "../utils/typeSafeDestructureForRoomConfig";
import Duration from "../components/Room/Duration";
import Position from "../components/Room/Position";
import { useCurrentUserStore } from "../store/currentUserSlice";
import { typeSafeDestructureOfCurrentUser } from "../utils/typeSafeDestructureOfCurrentUser";
import { TVotes } from "../types";

type TTotalVotes = TVotes[];

const Room = () => {
  // create useRoom
  const { code } = useParams();
  const { loading, roomConfig } = useRoom(code ?? "");
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const { _id } = typeSafeDestructureOfCurrentUser(currentUser) ?? {};

  const { expiration, title, votingDetails, participants } =
    typeSafeDestructureForRoomConfig(roomConfig) ?? {};

  // get the current user in the participant
  const currentUserVotes = participants?.find((p) => p.userId === _id);

  // render each position
  const renderPositions = votingDetails?.map((pos) => {
    // get the current user votes for each position
    const currentUserVoteForPosition = currentUserVotes?.votes.find(
      (vote) => vote.position === pos.title
    ); // * -> {position: title, votedFor: id}

    // total votes is array of object TVote
    const totalVoteForPos: TTotalVotes = [];

    //for each participant find the position and return the vote object
    participants?.forEach((p) =>
      p.votes.find((vote) => {
        if (vote.position === pos.title) {
          totalVoteForPos.push(vote);
        }
      })
    );
    console.log(totalVoteForPos.length);

    return (
      <Position
        key={pos._id}
        position={pos}
        totalVoteForPos={totalVoteForPos}
        currentUserVoteForPosition={currentUserVoteForPosition}
      />
    );
  });
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
