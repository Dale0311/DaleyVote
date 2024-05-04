const Candidate = () => {
  return (
    <div className="font-body p-4 space-x-2 flex items-center">
      <img
        src="/imgs/1.jpg"
        alt="candidate picture"
        className="w-24 h-24 border border-yellow-500"
      />
      <div>
        <h1 className="text-3xl">Harvey Spectre</h1>
      </div>
    </div>
  );
};

export default Candidate;
