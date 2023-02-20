import { GraphDataProps } from './interfaces';

const today = new Date();
const oldDate = (days: number = 0): string => {
  const date = new Date();
  date.setDate(today.getDate() - days);
  return date.toDateString();
};
const randomInt = (range: number = 100): number =>
  Math.floor(Math.random() * range);

export const viewedActivity: GraphDataProps[] = Array.from('12345', (i) => ({
  label: `activity ${i}`,
  data: Array.from([5, 4, 3, 2, 1, 0], (days) => ({
    primary: oldDate(days),
    secondary: randomInt(),
  })),
}));

export const registeredActivity: GraphDataProps[] = Array.from(
  '12345',
  (i) => ({
    label: `activity ${i}`,
    data: Array.from([5, 4, 3, 2, 1, 0], (days) => ({
      primary: oldDate(days),
      secondary: randomInt(50),
    })),
  }),
);
