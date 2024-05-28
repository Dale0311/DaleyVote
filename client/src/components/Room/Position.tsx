import { TPositionForRoom } from '../../types';
import Candidate from '../CreateRoom/Candidate';
type TProps = {
  position: TPositionForRoom;
};

const Position = ({ position }: TProps) => {
  const renderCandidates = position.candidates.map((candidate) => (
    <Candidate key={candidate._id} img={candidate.img} name={candidate.name} />
  ));
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
