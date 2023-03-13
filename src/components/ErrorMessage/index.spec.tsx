import { render, screen } from '@testing-library/react';
import ErrorMessage from '.';

describe('ErrorMessage', () => {
  it('display nothing if there is no error', () => {
    render(<ErrorMessage isError={false} message="message" />);
    expect(screen.queryByText('message')).not.toBeInTheDocument();
  });

  it('displays an error message if there is an error', () => {
    render(<ErrorMessage isError={true} message="message" />);
    expect(screen.getByText('message')).toBeInTheDocument();
  });
});
