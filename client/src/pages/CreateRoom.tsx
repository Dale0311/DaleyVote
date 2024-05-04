import { useState } from 'react';
import CreateCandidate from '../components/CreateCandidate';
import { HiOutlineArrowRightStartOnRectangle } from 'react-icons/hi2';
import { Candidate } from '../types/candidates';
const CreateRoom = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { imgUrl: '', name: '', candidateId: `candidate1` },
    { imgUrl: '', name: '', candidateId: `candidate2` },
  ]);
  return (
    <div className="p-4 space-y-2">
      <form className="border p-4 space-y-4">
        <div className="text-lg font-body">
          <label htmlFor="">Position: </label>
          <input type="text" placeholder="President" />
        </div>

        {/* create candidate */}
        <div className="space-y-2">
          {candidates.map((candidate) => (
            <CreateCandidate
              key={candidate.candidateId}
              candidate={candidate}
              setCandidates={setCandidates}
            />
          ))}
        </div>
      </form>
      <div className="flex justify-end">
        <button
          className="flex space-x-1 items-center p-3 bg-blue-500 text-white hover:bg-blue-600 rounded"
          onClick={() => console.log(candidates)}
        >
          <p>Create Room</p>
          <HiOutlineArrowRightStartOnRectangle />
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
