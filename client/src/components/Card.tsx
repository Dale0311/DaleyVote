import { FaEye } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
type CardTypes = { name: string };
const Card = ({ name }: CardTypes) => {
  return (
    <div className="p-4 border rounded text-body bg-zinc-50">
      <div className="flex items-center">
        <p>Live</p>
        <GoDotFill className="text-red-500" />
      </div>
      <h1 className="text-lg">Daley School President 2024 Election</h1>
      <div className="flex items-center justify-end space-x-1">
        <p>122</p>
        <FaEye />
      </div>
    </div>
  );
};

export default Card;
