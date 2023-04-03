/* eslint-disable no-import-assign */
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as auth from 'firebase/auth';

import EmployeeDashboard from '.';
import * as constant from './constant';
import { AuthProvider } from '../../../context/employeeContext';
import * as API from '../../../api/apiLayer';
import * as hooks from '../../../hooks/useEmployee';
import { act } from 'react-dom/test-utils';

const renderWithAuthProvider = (component: React.ReactElement): any =>
  render(<AuthProvider>{component}</AuthProvider>);

let mockData: any;

jest.mock('firebase/auth');
jest.mock('firebase/app');

jest.mock('./DeleteForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <button data-testid="deleteForm" onClick={() => onSubmit([])} />
  ),
}));

jest.mock('./AddForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <button data-testid="addForm" onClick={() => onSubmit(mockData)} />
  ),
}));

describe('Employee Dashboard', () => {
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
    // @ts-expect-error
    API.getEmployees = jest.fn().mockResolvedValue([
      {
        id: 'FIREBASE_ID',
        name: 'John Doe',
        email: 'fake@email.com',
        role: 'Admin',
      },
    ]);
    // @ts-expect-error
    API.deleteEmployees = jest.fn().mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockData = undefined;
  });

  it('open add employee form test', async () => {
    renderWithAuthProvider(<EmployeeDashboard />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    act(() => userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON)));

    expect(await screen.findByTestId('addForm')).toBeInTheDocument();
  });

  it('when getEmployee throw error returns empty list of employees', async () => {
    (
      API.getEmployees as jest.MockedFunction<typeof API.getEmployees>
    ).mockReturnValueOnce(Promise.reject(new Error('error', { cause: 1 })));

    renderWithAuthProvider(<EmployeeDashboard />);

    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.queryByText(/jdoe@email.com/)).not.toBeInTheDocument();
  });

  it('hides the action button when employee is not an admin', async () => {
    // @ts-expect-error
    hooks.useAuth.mockReturnValue({
      employee: {
        role: 'Normal',
      },
    });

    render(<EmployeeDashboard />);

    expect(await screen.findByText(constant.HEADER)).toBeInTheDocument();
    expect(
      screen.queryByText(constant.ADD_EMPLOYEE_BUTTON),
    ).not.toBeInTheDocument();
  });

  describe('addEmployee', () => {
    beforeEach(() => {
      // @ts-expect-error
      API.addEmployee = jest.fn().mockResolvedValue({});
      // @ts-expect-error
      auth.sendSignInLinkToEmail.mockResolvedValue();
      // @ts-expect-error
      auth.createUserWithEmailAndPassword.mockResolvedValue({
        user: { uid: 'firebaseId' },
      });
      mockData = {
        employeeEmail: 'fake@email.com',
        employeeFirstName: '',
        employeeLastName: '',
        employeePassword: '',
        role: '',
      };
    });

    it('changes add employee button to close after click', async () => {
      render(<EmployeeDashboard />);
      act(() =>
        userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON)),
      );
      expect(await screen.findByText('Close')).toBeInTheDocument();
    });

    it('changes button back to Add employee when click on close', async () => {
      render(<EmployeeDashboard />);
      act(() =>
        userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON)),
      );
      const closeButton = await screen.findByText('Close');
      act(() => userEvent.click(closeButton));
      expect(screen.queryByText('Close')).not.toBeInTheDocument();
    });

    it('submit add employee form after submit button clicked', async () => {
      mockData = {
        employeeEmail: 'jd@email.com',
        employeeFirstName: 'John',
        employeeLastName: 'Doe',
        password: '1234',
        role: 'Admin',
      };

      renderWithAuthProvider(<EmployeeDashboard />);

      act(() =>
        userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON)),
      );
      userEvent.click(await screen.findByTestId('addForm'));

      expect(await screen.findByRole('table')).toBeInTheDocument();
      expect(API.addEmployee).toHaveBeenCalledWith(
        expect.stringContaining(''),
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'jd@email.com',
          firebase_id: expect.any(String),
          role: 'Admin',
          root: false,
        },
      );
    });

    it('first calls createUserWithEmailAndPassword when submitting', async () => {
      mockData = {
        ...mockData,
        employeeEmail: 'fake@email.com',
        employeePassword: 'password',
      };

      renderWithAuthProvider(<EmployeeDashboard />);

      act(() =>
        userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON)),
      );
      const formButton = await screen.findByTestId('addForm');
      act(() => userEvent.click(formButton));

      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        undefined,
        'fake@email.com',
        'password',
      );
      await waitForElementToBeRemoved(() => screen.queryByTestId('addForm'));
    });

    it('closes addForm after successful operation', async () => {
      renderWithAuthProvider(<EmployeeDashboard />);

      act(() =>
        userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON)),
      );
      userEvent.click(await screen.findByTestId('addForm'));

      await waitForElementToBeRemoved(() => screen.queryByTestId('addForm'));
    });
  });

  describe('DeleteForm', () => {
    it('displays deleteForm when delete button is clicked', async () => {
      render(<EmployeeDashboard />);

      act(() =>
        userEvent.click(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON)),
      );

      expect(await screen.findByTestId('deleteForm')).toBeInTheDocument();
    });

    it('calls deleteEmployee when clicking delete in DeleteForm', async () => {
      render(<EmployeeDashboard />);

      act(() =>
        userEvent.click(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON)),
      );
      userEvent.click(await screen.findByTestId('deleteForm'));

      expect(API.deleteEmployees).toHaveBeenCalledWith([], 'businessId');
      await act(async () => await Promise.resolve());
    });

    it('changes delete employee button to close after click', async () => {
      render(<EmployeeDashboard />);

      act(() =>
        userEvent.click(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON)),
      );
      expect(await screen.findByText('Close')).toBeInTheDocument();
    });

    it('changes back to delete employee when click on close', async () => {
      render(<EmployeeDashboard />);

      act(() =>
        userEvent.dblClick(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON)),
      );
      expect(await screen.findByText('Close')).toBeInTheDocument();
    });

    it('closes the deleteForm on successful delete', async () => {
      render(<EmployeeDashboard />);
      act(() =>
        userEvent.click(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON)),
      );
      userEvent.click(await screen.findByTestId('deleteForm'));

      await waitForElementToBeRemoved(() => screen.queryByTestId('deleteForm'));
    });
  });
});
