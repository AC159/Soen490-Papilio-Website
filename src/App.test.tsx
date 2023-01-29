import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('firebase/auth');
jest.mock('firebase/app');

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Get the App and Start Exploring your City Today/i,
  );
  expect(linkElement).toBeInTheDocument();
});
