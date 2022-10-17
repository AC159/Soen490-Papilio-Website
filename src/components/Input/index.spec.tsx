import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './';

const TestInput = (): JSX.Element => {
  const [value, setValue] = useState('');
  return (
    <Input
      placeholder='placholder'
      name="input"
      label="label"
      testId='input-test'
      value={value}
      onChange={(e: React.FormEvent<HTMLInputElement>) => { setValue(e.currentTarget.value); }}
      hasLabel
    />
  );
};

test('mechanism test', async () => {
  render(<TestInput />);

  await userEvent.type(screen.getByTestId('input-test'), 'input');
  expect(screen.getByTestId('input-test')).toHaveValue('input');

  // await userEvent.
  await userEvent.type(screen.getByTestId('input-test'), '-tess{backspace}t');
  expect(screen.getByTestId('input-test')).toHaveValue('input-test');
});
