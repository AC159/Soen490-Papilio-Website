import { render } from '@testing-library/react';
import App from './App';

jest.mock('firebase/auth');
jest.mock('firebase/app');

test('renders learn react link', () => {
  render(<App />);
});
