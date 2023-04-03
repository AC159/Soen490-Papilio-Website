import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Billing from '.';

let mockBody;

const defaultProps = {
  business: {
    adTier: 0,
  },
  // subscription: '',
  // packageName: '',
  // cost: '',
  // creditCardInfo: {
  //   cardNumber: '',
  // },
  // paymentHistory: [],
};

describe('Billing', () => {
  beforeEach(() => {
    mockBody = defaultProps;

    window.fetch = jest.fn(
      async () =>
        await Promise.resolve({
          json: async () => await Promise.resolve(mockBody),
        }),
    ) as jest.Mock;
  });

  it('display no active subscription when no subscription', async () => {
    await act(() => render(<Billing />));
    expect(
      await screen.findByText('No Active Subscription'),
    ).toBeInTheDocument();
  });

  it.skip('displays subscription when user has a subscription', async () => {
    mockBody = {
      ...defaultProps,
      subscription: 'user-subscription',
    };
    render(<Billing />);
    expect(await screen.findByText('user-subscription')).toBeInTheDocument();
  });

  it('hides package name when no subscription', async () => {
    await act(() => render(<Billing />));
    expect(screen.queryByText('Package Name:')).not.toBeInTheDocument();
  });

  it('displays package name and cost when user has a subscription', async () => {
    mockBody = {
      business: {
        adTier: 1,
      },
    };
    render(<Billing />);
    expect(await screen.findByText('BASIC')).toBeInTheDocument();
    expect(await screen.findByText('$9.99/month')).toBeInTheDocument();
  });

  it('display no credit card information found when no credit card', async () => {
    await act(() => render(<Billing />));
    expect(
      await screen.findByText('No credit card information found'),
    ).toBeInTheDocument();
  });

  it.skip('displays credit card number when user has a credit card', async () => {
    mockBody = {
      ...defaultProps,
      creditCardInfo: {
        cardNumber: '1234 5678 9012 3456',
      },
    };
    render(<Billing />);
    expect(await screen.findByText('1234 5678 9012 3456')).toBeInTheDocument();
  });

  it('display no payment history found when no payment made', async () => {
    await act(() => render(<Billing />));
    expect(
      await screen.findByText('No payment history found', { selector: 'td' }),
    ).toBeInTheDocument();
  });

  it.skip('displays payment history when user has a payment history', async () => {
    const date = new Date();
    mockBody = {
      ...defaultProps,
      paymentHistory: [
        { packageName: 'packageName', cost: '1234', date: date.toDateString() },
      ],
    };
    render(<Billing />);
    expect(
      await screen.findByText('packageName', { selector: 'td' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('1234', { selector: 'td' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(date.toDateString(), { selector: 'td' }),
    ).toBeInTheDocument();
  });
});
