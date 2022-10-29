import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SideMenu from '.';

describe('test side menu', () => {
  it('should display the 5 tabs', () => {
    render(
      <BrowserRouter><SideMenu /></BrowserRouter>
    );

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(5);
  });
});
