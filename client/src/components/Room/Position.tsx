import { TParticipant, TPositionForRoom, TVotes } from "../../types";
import Candidate from "../CreateRoom/Candidate";
type TProps = {
  position: TPositionForRoom;
  currentUserVoteForPosition?: TVotes;
  totalVoteForPos: TVotes[];
};

const Position = ({
  position,
  currentUserVoteForPosition,
  totalVoteForPos,
}: TProps) => {
  const totalVotes = totalVoteForPos.length;

  // render candidates
  const renderCandidates = position.candidates.map((candidate) => {
    const totalVotesForCandidate = totalVoteForPos.filter(
      (vote) => vote.votedFor === candidate._id
    ).length;
    return (
      <Candidate
        key={candidate._id}
        id={candidate._id}
        img={candidate.img}
        name={candidate.name}
        currentUserVoteForPosition={currentUserVoteForPosition}
        totalVotes={totalVotes}
        totalVotesForCandidate={totalVotesForCandidate}
      />
    );
  });

  return (
    <div className="border p-4 space-y-4">
      <div>
        <h1 className="text-lg font-semibold font-head">{position.title}</h1>
      </div>
      {renderCandidates}
    </div>
  );
};

export default Position;
