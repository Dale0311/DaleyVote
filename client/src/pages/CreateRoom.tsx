import { useState } from 'react';
import { Position } from '../types';
import CreatePosition from '../components/CreateRoom/CreatePosition';
import positionDefaultValue from '../utils/positionDefaultObject';
import { useCreateRoom } from '../store/createRoomSlice';

const CreateRoom = () => {
  // to render dynamic position forms
  const [positionCount, setPositionCount] = useState(1);

  const positions = useCreateRoom((state) => state.positions);

  // TBA
  const [title, setTitle] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // creating component base on the state
  const toRenderDynamicPositionComponent = [];
  for (let index = 0; index < positionCount; index++) {
    toRenderDynamicPositionComponent.push(<CreatePosition key={index} />);
  }
  const canSubmit = positionCount === positions.length;

  return (
    <div className="p-4 space-y-4">
      {/* Positions */}
      {toRenderDynamicPositionComponent}

      <button
        className="w-full mx-auto items-center p-3 border font-body text-gray-500 rounded hover:shadow-lg duration-300"
        onClick={() => setPositionCount((prev) => prev + 1)}
      >
        <p>Create Position</p>
      </button>

      {/* Temp Submit Button */}
      <div className="flex justify-end">
        <button
          className={`flex space-x-1 items-center p-3 bg-blue-500 text-white hover:bg-blue-600 rounded font-body ${
            !canSubmit ? 'cursor-not-allowed hover:bg-blue-400 bg-blue-400' : ''
          }`}
          // clear data in createRoom
          disabled={!canSubmit}
          onClick={(e) => {
            e.stopPropagation();
            console.log(positions);
          }}
        >
          <p>Create Room</p>
        </button>
      </div>
    </div>
  );
};

// to be solve today!
// after finalized user can edit the position

export default CreateRoom;
