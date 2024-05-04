import { useRef } from 'react';
import { Candidate } from '../types/candidates';

type Props = {
  candidate: Candidate;
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
};
const CreateCandidate = ({ candidate, setCandidates }: Props) => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="font-body p-4 space-x-2 flex border">
      <input type="file" className="hidden" ref={imgInputRef} />
      <div
        className="w-32 h-32 border-2 border-dashed rounded text-gray-300 border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-300 hover:text-blue-500"
        onClick={() => imgInputRef.current?.click()}
      >
        <p className=" font-body">Image</p>
      </div>
      <div className="py-4">
        <input
          type="text"
          placeholder="name"
          className="border p-1 rounded"
          name={candidate.candidateId}
          value={candidate.name}
          onChange={(e) =>
            setCandidates((prev) =>
              prev.map((c) =>
                c.candidateId === e.target.name
                  ? { ...c, name: e.target.value }
                  : c
              )
            )
          }
        />
      </div>
    </div>
  );
};

export default CreateCandidate;
