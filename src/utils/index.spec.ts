import { formatDate } from '.';

describe('utils', () => {
  it('transform datetime to a readable date format', () => {
    const datetime = '2022-12-16T10:05:00.000Z';
    const result = formatDate(datetime);
    expect(result).toBe('Fri Dec 16 2022');
  });
});
