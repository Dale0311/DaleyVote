import VoteBar from "../Room/VoteBar";

type TProps = {
  img: {
    public_id: string;
    secure_url: string;
  };
  name: string;
};

const Candidate = ({ img, name }: TProps) => {
  return (
    <div className="font-body p-4 space-x-2 flex border">
      <div className="h-32 w-32  border border-yellow-500 overflow-hidden">
        <img
          src={img.secure_url}
          className="object-center"
          alt="candidate picture"
        />
      </div>
      <div className="border w-full space-y-2 py-4">
        <h1 className="text-xl">{name}</h1>
        <VoteBar />
      </div>
    </div>
  );
};

export default Candidate;
