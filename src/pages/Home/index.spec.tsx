import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '.';
import Header from '../../features/Header';

const savedLocation = window.location;

jest.mock('../../features/Header', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    // @ts-expect-error
    delete window.location;
    // @ts-expect-error
    window.location = Object.assign(new URL('https://example.org'), {
      ancestorOrigins: '',
      assign: jest.fn(),
      reload: jest.fn(),
      replace: jest.fn(),
    });
  });

  afterEach(() => {
    window.location = savedLocation;
  });

  it('displays a header', () => {
    render(<HomePage />);
    expect(Header).toHaveBeenCalled();
  });

  it('visit to app store when the app store image is clicked', () => {
    render(<HomePage />);
    userEvent.click(screen.getAllByRole('img')[1]);
    expect(window.location.href).toEqual('https://play.google.com/store/apps');
  });
});
