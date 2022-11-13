import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import Table from '.';

const headContent = [
  { value: 'Employee name' },
  { value: 'Email' },
  { value: 'Role', center: true },
];

const bodyContent = [
  {
    id: '2',
    content: [
      { value: 'Bob Doe' },
      { value: 'j.doe@email.com' },
      { value: 'Admin', center: true },
    ],
  },
  {
    id: '1',
    content: [
      { value: 'Alfred Doe' },
      { value: 'j.doe@email.com' },
      { value: 'Admin', center: true },
    ],
  },
  {
    id: '3',
    content: [
      { value: 'Carl Doe' },
      { value: 'j.doe@email.com' },
      { value: 'Admin', center: true },
    ],
  },
];

describe('test table', () => {
  it('should display the 5 tabs', () => {
    render(
      <Table
        headContent={headContent}
        bodyContent={bodyContent}
      />
    );

    expect(screen.getByRole('table').children[0].children).toHaveLength(1);
    expect(screen.getByRole('table').children[1].children).toHaveLength(3);
  });

  it('should sort the column in ascending order on 1st click, descending on 2nd click', async () => {
    render(
      <Table
        headContent={headContent}
        bodyContent={bodyContent}
      />
    );

    expect(screen.getByText(/Employee name/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Employee name/));
    await screen.findByRole('table').then(x => {
      expect(x.children[1].children[0].children[1].innerHTML).toBe('Alfred Doe');
      expect(x.children[1].children[1].children[1].innerHTML).toBe('Bob Doe');
      expect(x.children[1].children[2].children[1].innerHTML).toBe('Carl Doe');
    });

    userEvent.click(await screen.findByText(/Employee name/));
    await screen.findByRole('table').then(x => {
      expect(x.children[1].children[2].children[1].innerHTML).toBe('Alfred Doe');
      expect(x.children[1].children[1].children[1].innerHTML).toBe('Bob Doe');
      expect(x.children[1].children[0].children[1].innerHTML).toBe('Carl Doe');
    });
  });
});
