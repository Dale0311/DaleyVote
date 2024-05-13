import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { MdOutlineDone } from 'react-icons/md';

import { useCreateRoom } from '../../store/createRoomSlice';
import { Position } from '../../types';
import CreateCandidate from './CreateCandidate';
import candidateObject from '../../utils/candidateObject';
import { useState } from 'react';

const CreatePosition = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<Position>({
    defaultValues: {
      title: '',
      candidates: [candidateObject, candidateObject], // {name: "", img: null}
    },
  });

  const [isFinalized, setIsFinalized] = useState<boolean>(false);

  // dynamically create candidate component
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'candidates',
  });

  // get the setter fn for position in store
  const addOrUpdatePosition = useCreateRoom((state) => state.setPosition);

  // on handle finalized button
  const onHandleSubmit: SubmitHandler<Position> = (data) => {
    addOrUpdatePosition(data);
    setIsFinalized(true);
  };

  return (
    <form
      className={`border p-4 space-y-4 relative ${
        !isFinalized ? 'shadow-lg ' : ''
      }`}
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      <div className="text-lg font-body">
        <label htmlFor="">Position: </label>
        <input
          type="text"
          disabled={isFinalized}
          className={`border rounded pl-2 ${
            isFinalized ? 'cursor-not-allowed' : ''
          }`}
          {...register('title', { required: true })}
          placeholder="President"
        />
      </div>

      {/* displaying error */}
      {errors.title && (
        <span className="text-red-500 text-xs font-head">
          Title is required
        </span>
      )}

      {/* Candidates */}
      <div className="space-y-2">
        {fields.map((candidate, index) => (
          <CreateCandidate
            isFinalized={isFinalized}
            errors={errors}
            index={index}
            setValue={setValue}
            register={register}
            key={candidate.id}
            remove={remove}
          />
        ))}
      </div>

      {/* status */}
      {isFinalized && (
        <span className="absolute top-0 right-5 p-2 bg-green-500 text-white text-xl rounded-full">
          <MdOutlineDone />
        </span>
      )}

      <div className="flex justify-end space-x-2">
        {!isFinalized && (
          <button
            type="button"
            className="py-2 px-4 rounded border"
            onClick={() => append(candidateObject)}
          >
            Add Candidate
          </button>
        )}

        <div>
          {isFinalized ? (
            <button
              type="button"
              className="py-2 px-4 rounded border"
              onClick={() => reset({}, { keepValues: true })}
            >
              Edit
            </button>
          ) : (
            <button className="py-2 px-4 rounded border">Finalize</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CreatePosition;
