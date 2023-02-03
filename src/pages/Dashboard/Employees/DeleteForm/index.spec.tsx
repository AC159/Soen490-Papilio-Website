import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DeleteForm from '.';
import * as constant from './constant';
import * as Table from '../../../../features/Table';

const defaultProps = {
  employees: [],
  onSubmit: async () => {},
};

const oneEmployee = [
  {
    id: 'a',
    name: 'A name',
    email: 'fake@email.com',
    role: 'Admin',
  },
];

describe('Delete Form', () => {
  it('displays the form headline', () => {
    render(<DeleteForm {...defaultProps} />);
    expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
  });

  it('displays a button to delete the employees', () => {
    render(<DeleteForm {...defaultProps} />);
    expect(screen.getByText(constant.BUTTON_TEXT)).toBeInTheDocument();
  });

  it('calls onSubmit when the user clicks the delete button', async () => {
    const mockOnSubmit = jest.fn();
    render(<DeleteForm {...defaultProps} onSubmit={mockOnSubmit} />);

    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('passes the employees to the table components', () => {
    jest.spyOn(Table, 'default');

    render(<DeleteForm {...defaultProps} employees={oneEmployee} />);

    expect(Table.default).toHaveBeenCalledWith(
      expect.objectContaining({
        employees: oneEmployee,
      }),
      expect.anything(),
    );
  });

  it('insert the ids of deleted employees when click on user row', () => {
    const mockOnSubmit = jest.fn();
    render(<DeleteForm employees={oneEmployee} onSubmit={mockOnSubmit} />);

    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(mockOnSubmit).toHaveBeenCalledWith(['a']);
  });

  it('removes the id of the deleted employee when double click on user row', () => {
    const mockOnSubmit = jest.fn();
    render(<DeleteForm employees={oneEmployee} onSubmit={mockOnSubmit} />);

    userEvent.dblClick(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(mockOnSubmit).toHaveBeenCalledWith([]);
  });
});
