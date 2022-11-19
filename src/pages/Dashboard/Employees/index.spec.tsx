import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EmployeeDashboard from '.';
import * as constant from './constant';
import { FORM_HEADLINE } from './AddForm/constant';
import { AuthProvider } from '../../../context/employeeContext';
import * as API from '../../../api/apiLayer';
import * as hooks from '../../../hooks/useEmployee';

jest.mock('firebase/auth');
jest.mock('firebase/app');

describe('logic test', () => {
  test('open add employee form test', async () => {
    // @ts-expect-error
    // eslint-disable-next-line no-import-assign
    API.getEmployees = jest.fn().mockResolvedValue({
      employees: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'jdoe@email.com',
          role: 'Admin',
        },
      ],
    });

    // @ts-expect-error
    // eslint-disable-next-line no-import-assign
    hooks.useAuth = jest.fn().mockReturnValue({
      employee: {
        name: 'John',
        role: 'Admin',
        firebaseId: 'firebase-id',
      },
    });

    render(<AuthProvider><EmployeeDashboard /></AuthProvider>);

    expect(screen.getByRole('table')).toBeInTheDocument();
    userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));

    expect(await screen.findByText(FORM_HEADLINE)).toBeInTheDocument();
  });
});
