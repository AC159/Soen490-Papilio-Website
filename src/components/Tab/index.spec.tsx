import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Tab from './';

const TestTab = (): JSX.Element => {
  const [value, setValue] = useState(false);
  return (
    <Tab
      testId='tab-test'
      label='tab'
      isSelected={value}
      onClick={() => { setValue(!value); }}
    />
  );
};

const TestLinkTab = (): JSX.Element => {
  const [value, setValue] = useState(false);
  return (
    <Tab
      testId='tab-test'
      label='tab'
      isSelected={value}
      icon='home'
      type='link'
      to="test"
      onClick={() => { setValue(!value); }}
    />
  );
};

describe('mechanism test', () => {
  test('tab as button', async () => {
    render(<TestTab />);

    await userEvent.click(screen.getByTestId('tab-test'));
    expect(screen.getByTestId('tab-test')).toHaveClass('border-l-4');
  });

  test('tab as router link', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={<TestLinkTab />}
          />
          <Route path="/test" element={<div>New page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/tab/)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('tab-test'));
    expect(await screen.findByText(/New page/)).toBeInTheDocument();
  });
});
