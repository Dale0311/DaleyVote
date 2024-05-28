import VoteBar from '../Room/VoteBar';
import { FaRegCircle } from 'react-icons/fa';
import { FaRegDotCircle } from 'react-icons/fa';
type TProps = {
  img: {
    public_id: string;
    secure_url: string;
  };
  name: string;
};

const Candidate = ({ img, name }: TProps) => {
  return (
    <div className="font-body p-4 space-x-2 flex border-2 cursor-pointer group hover:border-blue-500 rounded">
      <div className="h-32 w-32 overflow-hidden">
        <img
          src={img.secure_url}
          className="object-cover h-32 w-32 rounded"
          alt="candidate picture"
        />
      </div>
      <div className="w-full space-y-2 py-4">
        <div className="flex items-center space-x-2">
          <FaRegCircle className="group-hover:text-blue-500 text-lg" />
          <h1 className="text-xl">{name}</h1>
        </div>
        <VoteBar />
      </div> 
    </div>
  );
};

export default Candidate;
