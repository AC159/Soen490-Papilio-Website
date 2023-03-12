import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './';

describe('Button', () => {
  it('fires onClick where the button is click', () => {
    const mockOnClick = jest.fn();
    render(<Button text="button" onClick={mockOnClick} />);

    userEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
