import useTimeleft from '../../hooks/useTimeleft';

type TDurationProps = {
  targetDate: string;
};
const Duration = ({ targetDate }: TDurationProps) => {
  const { timeLeft } = useTimeleft({ targetDate });
  return (
    <div className="flex space-x-4 text-center text-white bg-gray-800 p-4 rounded-lg">
      {!timeLeft ? (
        // tba
        <span>Time's up!</span>
      ) : (
        // * mapping object using entries
        Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col">
            <span className="text-2xl font-bold">{value}</span>
            <span className="uppercase">{unit}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Duration;
