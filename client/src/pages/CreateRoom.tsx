import { useState } from 'react';

import CreatePosition from '../components/CreateRoom/CreatePosition';
import { useCreateRoom } from '../store/createRoomSlice';
import Timepicker from '../components/Timepicker';
import { formatDateToISO } from '../utils/formatDate';
import { useCurrentUserStore } from '../store/currentUserSlice';
import { typeSafeDestructureOfCurrentUser } from '../utils/typeSafeDestructureOfCurrentUser';
import { createRoom } from '../api/index.api';

const CreateRoom = () => {
  // to render dynamic position forms
  const [positions, setPositions] = useState([
    'acdd9c90-faac-429d-9a0d-39e83d50f242',
  ]);

  // TBA
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState<{ hours: number; minutes: number }>({
    hours: 0,
    minutes: 0,
  });

  const currentPosition = useCreateRoom((state) => state.positions);
  const currentUser = useCurrentUserStore((state) => state.currentUser);

  const { _id } = typeSafeDestructureOfCurrentUser(currentUser) ?? {};

  // creating component base on the state
  const toRenderDynamicPositionComponent = positions.map((pos, i) => (
    <CreatePosition index={i} id={pos} key={pos} setPositions={setPositions} />
  ));

  // make sure that all state have truthy value
  const canSubmit = Boolean(
    positions.length === currentPosition.length &&
      title &&
      (duration.hours || duration.minutes)
  );

  // handle submit
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!canSubmit) return;

    // to upload configData to server
    const formattedDuration = formatDateToISO(duration);
    const configRoomData = {
      title,
      expiration: formattedDuration,
      votingDetails: currentPosition,
      createdById: _id,
    };

    createRoom(configRoomData);
    // join the room with the code
  };

  return (
    <div className="sm-p-4 space-y-4">
      <div className="text-lg font-body space-x-2">
        <label htmlFor="roomTitle">Room title:</label>
        <input
          type="text"
          name="roomTitle"
          placeholder="2024 Election"
          id="roomTitle"
          className="border pl-2 rounded text-base"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* date */}
      <div className="">
        <Timepicker key={'2'} duration={duration} setDuration={setDuration} />
      </div>
      {/* Positions */}
      <div>{toRenderDynamicPositionComponent}</div>

      <button
        className="w-full mx-auto items-center p-3 border font-body text-gray-500 rounded hover:shadow-lg duration-300"
        onClick={() =>
          setPositions((prev) => {
            return [...prev, crypto.randomUUID()];
          })
        }
      >
        <p>Create Position</p>
      </button>

      {/* Temp Submit Button */}
      <div className="flex justify-end">
        <button
          className={`flex space-x-1 items-center p-3 bg-blue-500 text-white hover:bg-blue-600 rounded font-body ${
            !canSubmit
              ? 'cursor-not-allowed disabled:hover:bg-blue-400 disabled:bg-blue-400'
              : ''
          }`}
          // clear data in createRoom
          disabled={!canSubmit}
          onClick={(e) => handleSubmit(e)}
        >
          <p>Create Room</p>
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
