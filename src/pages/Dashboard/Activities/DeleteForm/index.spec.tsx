/* eslint-disable no-import-assign */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DeleteForm from '.';
import * as constant from './constant';
import * as Table from '../Table';

const defaultProps = {
  activities: [],
  onSubmit: async () => {},
};

const oneActivity = [
  {
    id: 'a',
    title: 'A name',
    description: 'Some description',
    costPerIndividual: 7.0,
    costPerGroup: 25.0,
    groupSize: 4,
    startTime: 'Oct 10 2022',
    endTime: 'Nov 10 2022',
    address: '123 address',
  },
];

const renderWithPortal = (component: React.ReactElement): any =>
  render(<div id="portalRoot">{component}</div>);

it('displays the form headline', () => {
  render(<DeleteForm {...defaultProps} />);
  expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
});

it('displays a button to delete the activities', () => {
  render(<DeleteForm {...defaultProps} />);
  expect(screen.getByText(constant.BUTTON_TEXT)).toBeInTheDocument();
});

it('calls onSubmit when the user clicks the delete button', async () => {
  const mockOnSubmit = jest.fn();
  renderWithPortal(<DeleteForm {...defaultProps} onSubmit={mockOnSubmit} />);

  userEvent.click(screen.getByText(constant.BUTTON_TEXT));
  userEvent.click(await screen.findByText(/^Delete$/));

  expect(mockOnSubmit).toHaveBeenCalled();
});

it('passes the activities to the table components', () => {
  jest.spyOn(Table, 'default');

  render(<DeleteForm {...defaultProps} activities={oneActivity} />);

  expect(Table.default).toHaveBeenCalledWith(
    expect.objectContaining({
      activities: oneActivity,
    }),
    expect.anything(),
  );
});

it('insert the ids of deleted activities when click on user row', async () => {
  const mockOnSubmit = jest.fn();
  renderWithPortal(
    <DeleteForm activities={oneActivity} onSubmit={mockOnSubmit} />,
  );

  userEvent.click(screen.getByRole('checkbox'));
  userEvent.click(screen.getByText(constant.BUTTON_TEXT));
  userEvent.click(await screen.findByText(/^Delete$/));

  expect(mockOnSubmit).toHaveBeenCalledWith(['a']);
});

it('removes the id of the deleted activity when double click on user row', () => {
  const mockOnSubmit = jest.fn();
  render(<DeleteForm activities={oneActivity} onSubmit={mockOnSubmit} />);

  userEvent.dblClick(screen.getByRole('checkbox'));
  userEvent.click(screen.getByText(constant.BUTTON_TEXT));

  expect(screen.queryByText(/^Delete$/)).not.toBeInTheDocument();
});
