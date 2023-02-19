import { render, screen } from '@testing-library/react';
import { Portal } from './portal';

describe('Portal test', () => {
  it('should show the portal', () => {
    render(
      <div id="container">
        <Portal wrapper="container">
          <h1>Working</h1>
        </Portal>
      </div>,
    );

    expect(screen.getByText(/Working/)).toBeInTheDocument();
  });

  it('should not show the portal when wrapper not present', () => {
    render(
      <Portal wrapper="container">
        <h1>Working</h1>
      </Portal>,
    );

    expect(screen.queryByText(/Working/)).not.toBeInTheDocument();
  });
});
