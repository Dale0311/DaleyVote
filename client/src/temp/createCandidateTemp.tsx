import { useState } from 'react';
import CreateCandidate from '../components/CreateRoom/CreateCandidate';
import { HiOutlineArrowRightStartOnRectangle } from 'react-icons/hi2';
import { Position } from '../types';
const CreateRoom = () => {
  const [positions, setPositions] = useState<Position[]>([
    {
      name: '',
      candidates: [
        { img: null, name: '' },
        { img: null, name: '' },
      ],
    },
  ]);

  // TBA
  const [title, setTitle] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  return (
    <div className="p-4 space-y-2">
      {/* <form className="border p-4 space-y-4">
        <div className="text-lg font-body">
          <label htmlFor="">Position: </label>
          <input
            type="text"
            className="border rounded pl-2"
            placeholder="President"
          />
        </div>

        <div className="space-y-2">
          {candidates.map((candidate) => (
            <CreateCandidate
              key={candidate.candidateId}
              candidate={candidate}
              setCandidates={setCandidates}
            />
          ))}
        </div>
      </form> */}

      <div className="flex justify-end">
        <button
          className="flex space-x-1 items-center p-3 bg-blue-500 text-white hover:bg-blue-600 rounded"
          onClick={() => setPositions}
        >
          <p>Create Position</p>
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
