import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SideMenu from '.';
import { AuthProvider } from '../../context/employeeContext';

describe('test side menu', () => {
  it('should display the 5 tabs', () => {
    render(
      <AuthProvider>
        <BrowserRouter><SideMenu /></BrowserRouter>
      </AuthProvider>
    );

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(5);
  });
});
