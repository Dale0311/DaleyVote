type Duration = {
  hours: number;
  minutes: number;
};

type Prop = {
  duration: Duration;
  setDuration: React.Dispatch<
    React.SetStateAction<{
      hours: number;
      minutes: number;
    }>
  >;
};

const Timepicker = ({ duration, setDuration }: Prop) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    let val = value.replace(/^0+/, ''); // Remove leading zeros
    //e.g: val = "01" or "0" -> "1" or ""
    if (!val) {
      setDuration((prev) => ({ ...prev, [name]: '0' }));
      return;
    } else {
      const toNumVal = Number(val);
      if (name === 'hours') {
        if (toNumVal > 23 || toNumVal < 1) return;
      } else {
        if (toNumVal > 59 || toNumVal < 1) return;
      }
      setDuration((prev) => ({ ...prev, [name]: val }));
    }
  };

  const toRenderTime: (duration: Duration) => string = (duration) => {
    const { hours, minutes } = duration;
    let toRender;
    if (hours || minutes) {
      if (hours && !minutes) {
        toRender = `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
      } else if (!hours && minutes) {
        toRender = `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
      } else {
        toRender = `${hours} h ${minutes} ${minutes > 1 ? 'mins' : 'min'}`;
      }
      return toRender;
    }
    return '';
  };

  const toRenderT = toRenderTime(duration);

  return (
    <div className="bg-gray-50  rounded-lg text-white flex flex-col p-4 space-y-1">
      <div className="flex space-x-2 items-center">
        <h1 className="text-gray-600 font-body">Duration:</h1>
        <span className="font-head text-gray-500">{toRenderT}</span>
      </div>
      <div className="flex items-center space-x-1 text-xl">
        <div className="flex  text-gray-600  items-center">
          <input
            type="number"
            min={0}
            max={23}
            value={duration.hours}
            name="hours"
            onChange={handleChange}
            required
            placeholder="hh"
            className={`w-12 h-12 border-2  rounded bg-transparent outline-none text-center font-semibold border-gray-700 focus:border-blue-500 focus:text-blue-500 text-gray-700 transition spin-button-none `}
          />
        </div>
        <span className="text-black">:</span>
        <div className="flex  text-gray-600  items-center">
          <input
            type="number"
            min={0}
            max={59}
            name="minutes"
            value={duration.minutes}
            onChange={handleChange}
            placeholder="mm"
            className={`w-12 h-12 border-2  rounded bg-transparent outline-none text-center font-semibold border-gray-700 focus:border-blue-500 focus:text-blue-500 text-gray-700 transition spin-button-none `}
          />
        </div>
      </div>
      {/* To be fix */}
    </div>
  );
};
// to improve duration:
// conditional text render
// how to use it as a countdown

// next need to initialize my cloudinary set up again

export default Timepicker;
