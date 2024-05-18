import { useState } from 'react';

import CreatePosition from '../components/CreateRoom/CreatePosition';
import { useCreateRoom } from '../store/createRoomSlice';
import Timepicker from '../components/Timepicker';
import { getSignature, uploadImg } from '../api/index.api';

const CreateRoom = () => {
  // to render dynamic position forms
  const [positions, setPositions] = useState([
    'acdd9c90-faac-429d-9a0d-39e83d50f242',
  ]);

  const currentPosition = useCreateRoom((state) => state.positions);

  // TBA
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState<{ hour: number; minutes: number }>({
    hour: 0,
    minutes: 0,
  });

  // creating component base on the state
  const toRenderDynamicPositionComponent = positions.map((pos, i) => (
    <CreatePosition index={i} id={pos} key={pos} setPositions={setPositions} />
  ));

  // make sure that all state have truthy value
  const canSubmit = Boolean(
    positions.length === currentPosition.length &&
      title &&
      (duration.hour || duration.minutes)
  );

  // handle submit
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!canSubmit) return;

    // get signature from our backend - 1h exp
    const { apiKey, timestamp, signature } = await getSignature(
      'candidates_picture'
    );

    // first draft of uploading
    const processPos = async () => {
      const positions = Promise.all(
        currentPosition.map(async (pos) => {
          // for every candidates image:
          return Promise.all(
            pos.candidates.map(async (candidate) => {
              // create formData and fill the required data
              const data = new FormData();

              data.append('file', candidate.img || new Blob());
              data.append('api_key', apiKey);
              data.append('timestamp', timestamp);
              data.append('signature', signature);
              data.append('folder', 'candidates_picture');

              // upload the formData
              const uploadImgUrl: string = await uploadImg(data);

              // store img Url to candidate obj
              return { ...candidate, img: uploadImgUrl };
            })
          );
        })
      );
      return positions;
    };

    const positions = await processPos().then((val) => val);
    const obj = { title, duration, votingDetails: positions };
    console.log(obj);
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
        <Timepicker duration={duration} setDuration={setDuration} />
      </div>
      {/* Positions */}
      {toRenderDynamicPositionComponent}

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

// to be solve today!
// after finalized user can edit the position - done
// to be solve bukas.
// find a way to remove position when is > 1

// first draft: simply -1 on positionCount
// first try: bug when i remove the position component it doesn't render the position components in order using number

// 05/16/2024:
// done, i used string[] of unique id.
// recode: i can use useFormContext so that i can clean some mess up code

// create the rest of the inputs: title, date
// title done
// need to learn date inputs and value
// done

// 05/19/2024:
// second draft of upload img: upload from backend, each finalize will trigger upload.
// things to do:
// need to learn uploading from backend

// rafactors: delete generate_signature. @api, @current, @controller, @routes

// tags to remove/modify: just highlight each one and press ctrl + d
// @current: processPos , getSignature , uploadImg
// @CreatePosition: onHandleSubmit - each click will trigger upload img from backend
export default CreateRoom;
