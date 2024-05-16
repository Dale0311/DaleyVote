import { useState } from 'react';

const Timepicker = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSave = () => {
    alert(
      `Time set to: ${String(hours).padStart(2, '0')}:${String(
        minutes
      ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    );
  };

  const handleCancel = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white flex items-center">
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="hours" className="mb-1">
          Hours
        </label>
        <input
          id="hours"
          type="number"
          min="0"
          max="23"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-16 text-center p-2 rounded bg-gray-700 focus:outline-none"
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="minutes" className="mb-1">
          Minutes
        </label>
        <input
          id="minutes"
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="w-16 text-center p-2 rounded bg-gray-700 focus:outline-none"
        />
      </div>
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="seconds" className="mb-1">
          Seconds
        </label>
        <input
          id="seconds"
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          className="w-16 text-center p-2 rounded bg-gray-700 focus:outline-none"
        />
      </div>
      <div className="flex space-x-4 items-center">
        <button
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Timepicker;
