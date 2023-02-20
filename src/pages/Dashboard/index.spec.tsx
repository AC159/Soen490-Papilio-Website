import { render } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import Dashboard from '.';
import { AuthProvider } from '../../context/employeeContext';

jest.mock('react-router-dom', () => ({
  Outlet: jest.fn(),
}));
jest.mock('../../features/SideMenu', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    global.sessionStorage.setItem(
      'employee',
      JSON.stringify({
        name: '',
        firebaseId: '',
        businessId: '',
        role: '',
      }),
    );
  });

  afterEach(() => {
    global.sessionStorage.clear();
  });

  it('displays the pages from the router', () => {
    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>,
    );
    expect(Outlet).toHaveBeenCalled();
  });
});
