/* eslint-disable no-import-assign */
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DeleteForm from '.';
import * as constant from './constant';
import * as Table from '../../../../features/Table';
import * as hooks from '../../../../hooks/useEmployee';
import { act } from 'react-dom/test-utils';

const oneEmployee = [
  {
    id: 'a',
    name: 'A name',
    email: 'fake@email.com',
    role: 'Admin',
  },
];

const adminEmployee = [
  {
    id: 'firebase-id',
    name: 'John Doe',
    email: 'fake@email.com',
    role: 'Admin',
  },
];

const defaultProps = {
  employees: oneEmployee,
  onSubmit: async () => {},
};

const selectOneEmployee = (): void =>
  userEvent.click(screen.getByRole('checkbox'));

const renderWithPortal = (component: React.ReactElement): any =>
  render(<div id="portalRoot">{component}</div>);

describe('Delete Form', () => {
  beforeEach(() => {
    // @ts-expect-error
    hooks.useAuth = jest.fn().mockReturnValue({
      employee: {
        name: 'John Doe',
        role: 'Admin',
        firebaseId: 'firebase-id',
        businessId: 'businessId',
      },
    });
  });

  afterEach(() => {
    (hooks.useAuth as jest.MockedFunction<typeof hooks.useAuth>).mockClear();
  });

  it('displays the form headline', async () => {
    render(<DeleteForm {...defaultProps} />);
    expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
    await act(async () => await Promise.resolve());
  });

  it('displays a button to delete the employees', async () => {
    render(<DeleteForm {...defaultProps} />);
    expect(screen.getByText(constant.BUTTON_TEXT)).toBeInTheDocument();
    await act(async () => await Promise.resolve());
  });

  it('opens the submission modal when delete button is clicked', async () => {
    renderWithPortal(<DeleteForm {...defaultProps} />);
    selectOneEmployee();
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(
      await screen.findByText(
        'Are you sure you want to delete these employees?',
      ),
    ).toBeInTheDocument();
    await act(async () => await Promise.resolve());
  });

  it('displays a delete button inside the delete modal', async () => {
    renderWithPortal(<DeleteForm {...defaultProps} />);
    selectOneEmployee();
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(await screen.findByText(/^Delete$/)).toBeInTheDocument();
    await act(async () => await Promise.resolve());
  });

  it('displays a cancel button inside the delete modal', async () => {
    renderWithPortal(<DeleteForm {...defaultProps} />);
    selectOneEmployee();
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(await screen.findByText(/^Cancel$/)).toBeInTheDocument();
    await act(async () => await Promise.resolve());
  });

  it('closes the modal without deleting anything when cancel is clicked', async () => {
    const mockOnSubmit = jest.fn();
    renderWithPortal(<DeleteForm {...defaultProps} onSubmit={mockOnSubmit} />);
    selectOneEmployee();
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));
    userEvent.click(await screen.findByText(/^Cancel$/));

    await waitForElementToBeRemoved(() => screen.queryByText(/^Cancel$/));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit when the user clicks the delete button', async () => {
    const mockOnSubmit = jest.fn();
    renderWithPortal(<DeleteForm {...defaultProps} onSubmit={mockOnSubmit} />);

    selectOneEmployee();
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));
    userEvent.click(await screen.findByText(/^Delete$/));

    expect(mockOnSubmit).toHaveBeenCalled();
    await act(async () => await Promise.resolve());
  });

  it('passes the employees to the table components', async () => {
    jest.spyOn(Table, 'default');

    render(<DeleteForm {...defaultProps} employees={oneEmployee} />);

    expect(Table.default).toHaveBeenCalledWith(
      expect.objectContaining({
        rowsData: oneEmployee,
      }),
      expect.anything(),
    );
    await act(async () => await Promise.resolve());
  });

  it('insert the ids of deleted employees when click on user row', async () => {
    const mockOnSubmit = jest.fn();
    renderWithPortal(
      <DeleteForm employees={oneEmployee} onSubmit={mockOnSubmit} />,
    );

    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(await screen.findByText(constant.BUTTON_TEXT));
    userEvent.click(await screen.findByText(/^Delete$/));

    expect(mockOnSubmit).toHaveBeenCalledWith(['a']);
    await act(async () => await Promise.resolve());
  });

  it('removes the id of the deleted employee when double click on user row', async () => {
    renderWithPortal(<DeleteForm {...defaultProps} employees={oneEmployee} />);

    userEvent.dblClick(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(screen.queryByText(/^Delete$/)).not.toBeInTheDocument();
    await act(async () => await Promise.resolve());
  });

  it('block admin from deleting themselves', async () => {
    renderWithPortal(
      <DeleteForm {...defaultProps} employees={adminEmployee} />,
    );

    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(screen.queryByText(/^Delete$/)).not.toBeInTheDocument();
    await act(async () => await Promise.resolve());
  });

  it('closes the delete modal after successful delete', async () => {
    const mockOnSubmit = jest.fn();
    renderWithPortal(
      <DeleteForm employees={oneEmployee} onSubmit={mockOnSubmit} />,
    );

    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(constant.BUTTON_TEXT));
    userEvent.click(await screen.findByText(/^Delete$/));

    await waitForElementToBeRemoved(() => screen.queryByText(/^Delete$/));
  });
});
