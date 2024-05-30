import { TPositionForRoom, TVotes } from "../../types";
import Candidate from "../CreateRoom/Candidate";
type TProps = {
  position: TPositionForRoom;
  currentUserVoteForPosition?: TVotes;
  totalVoteForPos: TVotes[];
  setVotes: React.Dispatch<React.SetStateAction<TVotes[]>>;
  votes: TVotes[];
};

const Position = ({
  position,
  currentUserVoteForPosition,
  totalVoteForPos,
  setVotes,
  votes,
}: TProps) => {
  // total votes
  const totalVotes = totalVoteForPos.length;

  // get the current vote of the user in state
  const votedForState = votes.find(
    (vote) => vote.position === position.title
  )?.votedFor;

  // render candidates
  const renderCandidates = position.candidates.map((candidate) => {
    // get the total votes for each candidate
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
        votedForState={votedForState}
        setVotes={setVotes}
        positionTitle={position.title}
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
