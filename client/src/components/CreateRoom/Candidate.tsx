import VoteBar from "../Room/VoteBar";
import { FaRegCircle } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { TVotes } from "../../types";
type TProps = {
  img: {
    public_id: string;
    secure_url: string;
  };
  currentUserVoteForPosition?: { position: string; votedFor: string };
  name: string;
  id: string;
  totalVotes: number;
  totalVotesForCandidate: number;
  positionTitle: string;
  votedForState?: string;
  setVotes: React.Dispatch<React.SetStateAction<TVotes[]>>;
};

const Candidate = ({
  img,
  name,
  currentUserVoteForPosition,
  id,
  totalVotes,
  totalVotesForCandidate,
  positionTitle,
  setVotes,
  votedForState,
}: TProps) => {
  const { votedFor } = currentUserVoteForPosition ?? {};

  // if the user voted for this candidate
  const userVotedForThisCandidate = (votedFor || votedForState) === id; // i dunno a better var name >_<

  // percentage of the VoteBar of the candidate
  const candidatePercentageVoteBar =
    Math.floor((totalVotesForCandidate / totalVotes) * 100) || 0;

  // handle vote click
  const handleClickVote = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setVotes((prev) => {
      const positionExist = prev.find(
        (vote) => vote.position === positionTitle
      );

      // if position title doesn't exist in the votes array, simply add it
      if (!positionExist)
        return [...prev, { position: positionTitle, votedFor: id }];

      // if positionTitle === vote.position? update the object, else append the object
      return prev.map((vote) =>
        vote.position === positionTitle ? { ...vote, votedFor: id } : vote
      );
    });
  };
  return (
    <div
      className={`font-body p-4 space-x-2 flex cursor-pointer group border-2 hover:border-blue-500 rounded ${
        userVotedForThisCandidate ? "border-blue-500" : ""
      }`}
      onClick={handleClickVote}
    >
      <div className="h-32 w-32 overflow-hidden">
        <img
          src={img.secure_url}
          className="object-cover h-32 w-32 rounded"
          alt="candidate picture"
        />
      </div>
      <div className="w-full space-y-2 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center">
            {userVotedForThisCandidate ? (
              <FaRegDotCircle className="text-blue-500 text-lg" />
            ) : (
              <FaRegCircle className="group-hover:text-blue-500 text-lg" />
            )}
            <h1 className="text-xl">{name}</h1>
          </div>
          <span>{candidatePercentageVoteBar}%</span>
        </div>
        <VoteBar
          userVotedForThisCandidate={userVotedForThisCandidate}
          candidatePercentageVoteBar={candidatePercentageVoteBar}
        />
      </div>
    </div>
  );
};

export default Candidate;
