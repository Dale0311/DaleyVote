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
    getValues,
    setError,
  } = useForm<Position>({
    defaultValues: {
      title: '',
      id: crypto.randomUUID(),
      candidates: [candidateObject, candidateObject], // {name: "", img: null}
    },
  });

  const [isFinalized, setIsFinalized] = useState<boolean>(false);

  // dynamically create candidate component
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'candidates',
  });

  // useCreateRoom
  const currentPositions = useCreateRoom((state) => state.positions);
  const addPosition = useCreateRoom((state) => state.setPosition);
  const removePosition = useCreateRoom((state) => state.removePosition);

  // on handle finalized button
  const onHandleSubmit: SubmitHandler<Position> = (data) => {
    // we cannot finalized position if position title already exist in our store.
    const positionExist = currentPositions.find(
      (pos) => pos.title === data.title
    );
    if (positionExist) {
      setError(
        'title',
        {
          message: `Position: ${getValues('title')} already exist`,
        },
        { shouldFocus: true }
      );
      return;
    }
    console.log('diz new');
    addPosition(data);
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
            errors.title ? 'border-red-500 outline-none' : ''
          } ${isFinalized ? 'cursor-not-allowed' : ''}`}
          {...register('title', { required: true })}
          placeholder="President"
        />
      </div>

      {/* displaying error */}
      {errors.title && (
        <span className="text-red-500 text-xs font-head">
          {errors.title?.message ? errors.title?.message : 'Title is required'}
        </span>
      )}

      {/* Candidates */}
      <div className="space-y-2">
        {fields.map((candidate, index) => {
          const file = candidate?.img;
          const previewPicturePath = file ? URL.createObjectURL(file) : '';
          return (
            <CreateCandidate
              isFinalized={isFinalized}
              errors={errors}
              index={index}
              setValue={setValue}
              register={register}
              key={candidate.id}
              previewPicturePath={previewPicturePath}
              remove={remove}
            />
          );
        })}
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
              onClick={(e) => {
                // prevent defaults and stop event bubbling
                e.preventDefault();
                e.stopPropagation();

                // get all values that are inputted
                const title = getValues('title');
                const candidates = getValues('candidates');
                const id = getValues('id');

                // remove data from store
                removePosition(id);

                // reset form fields wth these as default value
                reset({ title, candidates, id });

                // set finalized to false to prevents disabled to all inputs
                setIsFinalized(false);
              }}
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
