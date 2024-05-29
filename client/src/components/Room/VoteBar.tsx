type TProps = {
  candidatePercentageVoteBar: number;
  userVotedForThisCandidate: boolean;
};
const VoteBar = ({
  candidatePercentageVoteBar,
  userVotedForThisCandidate,
}: TProps) => {
  return (
    <div className="w-full bg-gray-50 rounded-full h-6">
      <div
        className={` group-hover:bg-blue-500 h-6 rounded-full ${
          userVotedForThisCandidate ? "bg-blue-500" : "bg-gray-200"
        }`}
        style={{ width: `${candidatePercentageVoteBar}%` }}
      ></div>
    </div>
  );
};

export default VoteBar;
