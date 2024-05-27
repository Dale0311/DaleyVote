type TProps = {
  img: {
    public_id: string;
    secure_url: string;
  };
  name: string;
};

const Candidate = ({ img, name }: TProps) => {
  return (
    <div className="font-body p-4 space-x-2 flex items-center">
      <img
        src={img.secure_url}
        alt="candidate picture"
        className="w-24 h-24 border border-yellow-500"
      />
      <div>
        <h1 className="text-3xl">{name}</h1>
      </div>
    </div>
  );
};

export default Candidate;
