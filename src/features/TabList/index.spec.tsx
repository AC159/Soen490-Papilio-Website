// import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ITab } from '../TabList';
import TabList from '.';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const BUTTON_TABS: ITab[] = [
  { label: 'tab-1' },
  { label: 'tab-2' },
  { label: 'tab-3' },
];

const LINK_TABS: ITab[] = [
  { label: 'tab-1', path: '/', icon: 'ad' },
  { label: 'tab-2', path: '/2', icon: 'employee' },
  { label: 'tab-3', path: '/3', icon: 'event' },
];

describe('logic test', () => {
  test('Button tab list', async () => {
    render(<TabList tabs={BUTTON_TABS} horizontal/>);

    expect(screen.getAllByTestId('tab-test-id').at(0)).not.toHaveClass('border-transparent');
    screen.getAllByTestId('tab-test-id').filter((_, index) => index !== 0).forEach(x => { expect(x).toHaveClass('border-transparent'); });

    await userEvent.click(screen.getByText(/tab-2/));

    expect(screen.getAllByTestId('tab-test-id').at(1)).not.toHaveClass('border-transparent');
    screen.getAllByTestId('tab-test-id').filter((_, index) => index !== 1).forEach(x => { expect(x).toHaveClass('border-transparent'); });
  });

  test('Link tab list', async () => {
    render(
      <MemoryRouter>
        <TabList
          tabs={LINK_TABS}
        />
        <Routes >
          <Route path='/' element={<div>First</div>}/>
          <Route path='/2' element={<div>Second</div>}/>
          <Route path='/3' element={<div>Third</div>}/>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('tab-test-id').at(0)).not.toHaveClass('border-transparent');
    screen.getAllByTestId('tab-test-id').filter((_, index) => index !== 0).forEach(x => { expect(x).toHaveClass('border-transparent'); });
    expect(screen.getByText(/First/)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/tab-2/));

    expect((await screen.findAllByTestId('tab-test-id')).at(1)).not.toHaveClass('border-transparent');
    (await screen.findAllByTestId('tab-test-id')).filter((_, index) => index !== 1).forEach(x => { expect(x).toHaveClass('border-transparent'); });
    expect(await screen.findByText(/First/)).toBeInTheDocument();
  });
});
