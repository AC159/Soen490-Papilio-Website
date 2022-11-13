import { render, screen } from '@testing-library/react';
import Logo from '.';

describe('test logo', () => {
  it('should display the logo without text', () => {
    render(<Logo />);

    expect(screen.getByRole('img', { name: 'papilio logo' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'papilio logo' })).toHaveAttribute('src', '/logo.png');
  });

  it('should display the logo without text', () => {
    render(<Logo hasText/>);

    expect(screen.getByRole('img', { name: 'papilio logo' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'papilio logo' })).toHaveAttribute('src', '/logoText.png');
  });
});
