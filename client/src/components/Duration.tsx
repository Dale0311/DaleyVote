import { useState, useEffect } from "react";

interface DurationProps {
  targetDate?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const Duration = ({ targetDate }: DurationProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference =
        new Date(targetDate || "").getTime() - new Date().getTime();
      let timeLeft: TimeLeft | null = null;

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      setTimeLeft(timeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex space-x-4 text-center text-white bg-gray-800 p-4 rounded-lg">
      {!timeLeft ? (
        <span>Time's up!</span>
      ) : (
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
