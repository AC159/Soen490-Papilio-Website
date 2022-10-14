import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/How would you like to name your business?/i);
  expect(linkElement).toBeInTheDocument();
});
