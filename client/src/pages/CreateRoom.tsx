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

  return (
    <div className="p-4 space-y-2">
      {/* Positions */}
      {toRenderDynamicPositionComponent}

      <div className="flex justify-end">
        <button
          className="flex space-x-1 items-center p-3 bg-blue-500 text-white hover:bg-blue-600 rounded"
          onClick={() => setPositionCount((prev) => prev + 1)}
        >
          <p>Create Position</p>
        </button>
      </div>

      {/* Temp Submit Button */}
      <div className="flex justify-end">
        <button
          className="flex space-x-1 items-center p-3 bg-blue-500 text-white hover:bg-blue-600 rounded"
          onClick={() => console.log(positions)}
        >
          <p>Create Room</p>
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
