const VoteBar = () => {
  const progress = 30;
  return (
    <div className="w-full bg-gray-50 rounded-full h-6">
      <div
        className="bg-gray-200 h-6 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default VoteBar;
