import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './';

const TestButton = (): JSX.Element => {
  const [value, setValue] = useState(false);
  return (
    <>
      <Button
        testId='button-test'
        text='button'
        onClick={() => { setValue(!value); }}
      />
      {value && <span>Clicked</span>}
    </>
  );
};

test('mechanism test', async () => {
  render(<TestButton />);

  await userEvent.click(screen.getByTestId('button-test'));
  expect(screen.getByText(/Clicked/)).toBeInTheDocument();
});
