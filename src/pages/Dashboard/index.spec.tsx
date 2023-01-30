import { render } from '@testing-library/react';
import { Outlet } from 'react-router-dom';
import Dashboard from '.';

jest.mock('react-router-dom', () => ({
  Outlet: jest.fn(),
}));
jest.mock('../../features/SideMenu', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Dashboard', () => {
  it('displays the pages from the router', () => {
    render(<Dashboard />);
    expect(Outlet).toHaveBeenCalled();
  });
});
