import { add } from 'date-fns';

type Duration = {
  hours: number;
  minutes: number;
};
export const formatDateToISO = (duration: Duration) => {
  const baseDate = new Date(); // Or specify a specific date: new Date('2024-05-08T12:05:09.065Z')

  const newDate = add(baseDate, duration);

  return newDate;
};
