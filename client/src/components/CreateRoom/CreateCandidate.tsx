import { useRef, useState } from 'react';
import {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

import { Position } from '../../types';

type Prop = {
  register: UseFormRegister<Position>;
  index: number;
  setValue: UseFormSetValue<Position>;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<Position>;
  isFinalized: boolean;
  previewPicturePath: string;
};

const CreateCandidate = ({
  index,
  register,
  setValue,
  remove,
  errors,
  isFinalized,
  previewPicturePath,
}: Prop) => {
  // for hidden input
  const imgInputRef = useRef<HTMLInputElement>(null);

  // for previewPicture ---
  const [previewPicture, setPreviewPicture] = useState<string>(
    previewPicturePath ?? ''
  );

  // change file input value
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const previewPictureUrl = URL.createObjectURL(file);
      setPreviewPicture(previewPictureUrl);
    }
    setValue(`candidates.${index}.img`, file);
  };

  // remove the candidate
  const handleRemoveCandidate = () => {
    remove(index);
  };

  const requireFileError = errors.candidates?.[index]?.img
    ? `border-red-500 text-red-500`
    : '';

  return (
    <div className="font-body p-4 space-x-2 flex border relative">
      {/* hidden input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        {...register(`candidates.${index}.img`, { required: true })}
        ref={imgInputRef}
        onChange={handleFileInputChange}
      />

      {/* if previewPicture is truthy then preview it*/}
      {previewPicture ? (
        <img
          className={`w-32 h-32 object-contain border  ${
            isFinalized ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={() => (!isFinalized ? imgInputRef.current?.click() : '')}
          src={previewPicture}
        />
      ) : (
        <div
          className={`w-32 h-32 border-2 border-dashed rounded text-gray-300 border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-300 hover:text-blue-500 ${requireFileError}`}
          onClick={() => imgInputRef.current?.click()}
        >
          <p className=" font-body">Image</p>
        </div>
      )}
      <div className="py-4">
        <input
          type="text"
          disabled={isFinalized}
          placeholder="name"
          className={`border p-1 rounded outline-none ${
            errors.candidates?.[index]?.name &&
            'border-red-500 placeholder:text-red-500'
          } ${isFinalized ? 'cursor-not-allowed' : ''} `}
          {...register(`candidates.${index}.name`, { required: true })}
        />
      </div>

      {/* for deleting candidate if there's 3 or more candidates but not 2 */}
      {!isFinalized && index > 1 && (
        <button
          className="px-6 py-2 top-0 right-0 text-2xl rounded-bl-lg hover:bg-red-500 hover:text-white text-red-500 border border-red-500  absolute"
          onClick={handleRemoveCandidate}
        >
          <IoClose />
        </button>
      )}
    </div>
  );
};

export default CreateCandidate;
