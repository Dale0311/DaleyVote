import { Position as Pos } from '../../types';
import Candidate from '../CreateRoom/Candidate';

type TProps = {
  position: Pos;
};
const Position = ({ position }: TProps) => {
  console.log(position);

  //   const renderCandidates = position.candidates.map((candidate) => (
  //     <Candidate key={candidate._id} img={candidate.img} name={candidate.name} />
  //   ));
  return <div>hello world</div>;
};

export default Position;
