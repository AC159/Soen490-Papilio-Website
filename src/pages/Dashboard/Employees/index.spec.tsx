/* eslint-disable no-import-assign */
import {
  render,
  screen,
  waitFor,
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

  test('open add employee form test', async () => {
    renderWithAuthProvider(<EmployeeDashboard />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));

    expect(await screen.findByTestId('addForm')).toBeInTheDocument();
  });

  test('when getEmployee throw error returns empty list of employees', async () => {
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
      mockData = {
        employeeEmail: 'fake@email.com',
        employeeFirstName: '',
        employeeLastName: '',
        role: '',
      };
    });

    it('changes add employee button to close after click', async () => {
      await act(async () => {
        render(<EmployeeDashboard />);
        userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));
        expect(await screen.findByText('Close')).toBeInTheDocument();
      });
    });

    it('changes back to Add employee when click on close', async () => {
      await act(async () => {
        render(<EmployeeDashboard />);
        userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));
        userEvent.click(await screen.findByText('Close'));
        await waitForElementToBeRemoved(() => screen.queryByText('Close'));
      });
    });

    it('submit add employee form after submit button clicked', async () => {
      mockData = {
        employeeEmail: 'jd@email.com',
        employeeFirstName: 'John',
        employeeLastName: 'Doe',
        role: 'Admin',
      };

      renderWithAuthProvider(<EmployeeDashboard />);

      userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));
      userEvent.click(await screen.findByTestId('addForm'));

      expect(await screen.findByRole('table')).toBeInTheDocument();

       await act(async () => {
    userEvent.click(await screen.findByTestId('addForm'));
  });
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

    it('calls sendSignInLinkToEmail after successful addEmployee', async () => {
      mockData = {
        ...mockData,
        employeeEmail: 'fake@email.com',
      };
      renderWithAuthProvider(<EmployeeDashboard />);

      userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));
      userEvent.click(await screen.findByTestId('addForm'));

      await waitFor(() =>
        expect(auth.sendSignInLinkToEmail).toHaveBeenCalledWith(
          undefined,
          'fake@email.com',
          {
            url: 'https://localhost:3000/email-signin',
          },
        ),
      );
    });

    it('closes addForm after successful operation', async () => {
      renderWithAuthProvider(<EmployeeDashboard />);

      userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));
      userEvent.click(await screen.findByTestId('addForm'));

      await waitForElementToBeRemoved(() => screen.queryByTestId('addForm'));
    });
  });

  describe('DeleteForm', () => {
    it('displays deleteForm when delete button is clicked', async () => {
      render(<EmployeeDashboard />);

      userEvent.click(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON));

      expect(await screen.findByTestId('deleteForm')).toBeInTheDocument();
    });

    it('calls deleteEmployee when clicking delete in DeleteForm', async () => {
      render(<EmployeeDashboard />);

      userEvent.click(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON));
      userEvent.click(await screen.findByTestId('deleteForm'));

      expect(API.deleteEmployees).toHaveBeenCalledWith([], 'businessId');
      await act(async () => await Promise.resolve());
    });

    it('changes delete employee button to close after click', async () => {
      render(<EmployeeDashboard />);

      userEvent.click(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON));
      expect(await screen.findByText('Close')).toBeInTheDocument();
    });

    it('changes back to delete employee when click on close', async () => {
      render(<EmployeeDashboard />);

      userEvent.dblClick(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON));
      expect(await screen.findByText('Close')).toBeInTheDocument();
    });

    it('closes the deleteForm on successful delete', async () => {
      render(<EmployeeDashboard />);
      userEvent.click(screen.getByText(constant.DELETE_EMPLOYEE_BUTTON));
      userEvent.click(await screen.findByTestId('deleteForm'));

      await waitForElementToBeRemoved(() => screen.queryByTestId('deleteForm'));
    });
  });
});
