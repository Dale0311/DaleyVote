import { useState } from "react";
import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import typeSafeDestructureForRoomConfig from "../utils/typeSafeDestructureForRoomConfig";
import Duration from "../components/Room/Duration";
import Position from "../components/Room/Position";
import { useCurrentUserStore } from "../store/currentUserSlice";
import { typeSafeDestructureOfCurrentUser } from "../utils/typeSafeDestructureOfCurrentUser";
import { TVotes } from "../types";
import { userVotes } from "../api/index.api";

type TTotalVotes = TVotes[];

const Room = () => {
  // create useRoom
  const { code } = useParams();
  const { roomConfig, setRoomConfig } = useRoom(code ?? "");
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const [votes, setVotes] = useState<TVotes[]>([]);

  const { _id: userId } = typeSafeDestructureOfCurrentUser(currentUser) ?? {};

  const {
    expiration,
    title,
    votingDetails,
    participants,
    _id: roomId,
  } = typeSafeDestructureForRoomConfig(roomConfig) ?? {};

  // get the current user in the participant
  const currentUserVotes = participants?.find((p) => p.userId === userId);

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

    return (
      <Position
        key={pos._id}
        position={pos}
        totalVoteForPos={totalVoteForPos}
        setVotes={setVotes}
        votes={votes}
        currentUserVoteForPosition={currentUserVoteForPosition}
      />
    );
  });

  // handle submit vote
  const handleSubmitVote = async () => {
    //type guard
    if (userId && roomId) {
      await userVotes({ roomId, userId, votes });
    }
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="font-body text-xl">{title}</h1>
        <Duration targetDate={expiration || ""} />
      </div>
      <div>{renderPositions}</div>
      <div className="flex justify-end">
        <button
          className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg font-body"
          disabled={votes.length === 0}
          onClick={handleSubmitVote}
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
};

export default Room;
