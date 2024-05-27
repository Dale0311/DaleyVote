import { useEffect, useState } from 'react';

interface TDurationProps {
  targetDate?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

//* @param targetDate UTC format date typed string
const useTimeleft = ({ targetDate }: TDurationProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // get the diff time between the targetDate and currentDate
      const difference =
        new Date(targetDate || '').getTime() - new Date().getTime();
      let timeLeft: TimeLeft | null = null;

      // create hours, minutes, seconds base on the diff and miliseconds
      if (difference > 0) {
        timeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      setTimeLeft(timeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft };
};

export default useTimeleft;
