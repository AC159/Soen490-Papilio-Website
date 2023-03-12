import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import PaymentForm from '.';
import userEvent from '@testing-library/user-event';

let mockInitialEntries;

jest.mock('react-credit-cards-2', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const renderWithRouter = (component): any =>
  render(
    <MemoryRouter initialEntries={mockInitialEntries}>
      {component}
    </MemoryRouter>,
  );

describe('PaymentForm', () => {
  beforeEach(() => {
    mockInitialEntries = [''];
    window.fetch = jest.fn(
      async (body) =>
        await Promise.resolve({
          json: async () => await Promise.resolve(body),
        }),
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('display a credit card', () => {
    renderWithRouter(<PaymentForm />);
    expect(Cards).toHaveBeenCalled();
  });

  const itDisplaysATextbox = (name): void =>
    it('diplay a textbox for the credit card', () => {
      renderWithRouter(<PaymentForm />);
      expect(screen.getByRole('textbox', { name })).toBeInTheDocument();
    });

  describe('credit card number', () => {
    const creditCardPlaceholder = '____ ____ ____ ____';
    itDisplaysATextbox('Credit Number');
    it('display value on the credit card', async () => {
      const value = '1234432112344301';
      renderWithRouter(<PaymentForm />);
      act(() =>
        userEvent.type(
          screen.getByRole('textbox', { name: 'Credit Number' }),
          value,
        ),
      );

      expect(Cards).toHaveBeenLastCalledWith(
        expect.objectContaining({
          number: creditCardPlaceholder,
        }),
        expect.anything(),
      );
    });

    it('sends credit card number on submit', async () => {
      const value = '1234432112344301';
      renderWithRouter(<PaymentForm />);
      act(() =>
        userEvent.type(
          screen.getByRole('textbox', { name: 'Credit Number' }),
          value,
        ),
      );
      await act(async () => userEvent.click(await screen.findByText('Pay')));

      expect(window.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining(
            `"creditNumber":"${creditCardPlaceholder}"`,
          ),
        }),
      );
    });
  });

  describe("card holder's name", () => {
    const field = 'Credit Name';
    itDisplaysATextbox(field);
    it('display value on the credit card', async () => {
      const value = 'value';
      renderWithRouter(<PaymentForm />);
      act(() =>
        userEvent.type(screen.getByRole('textbox', { name: field }), value),
      );

      expect(Cards).toHaveBeenLastCalledWith(
        expect.objectContaining({
          name: value,
        }),
        expect.anything(),
      );
    });

    it('sends card holder name on submit', async () => {
      const value = 'value';
      renderWithRouter(<PaymentForm />);
      act(() =>
        userEvent.type(screen.getByRole('textbox', { name: field }), value),
      );
      await act(async () => userEvent.click(await screen.findByText('Pay')));

      expect(window.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining(`"creditName":"${value}"`),
        }),
      );
    });
  });

  describe('CVC', () => {
    itDisplaysATextbox('CVC');
    it('display value on the credit card', async () => {
      const value = '123';
      renderWithRouter(<PaymentForm />);
      act(() =>
        userEvent.type(screen.getByRole('textbox', { name: 'CVC' }), value),
      );

      expect(Cards).toHaveBeenLastCalledWith(
        expect.objectContaining({
          cvc: '___',
        }),
        expect.anything(),
      );
    });

    it('sends CVC on submit', async () => {
      const value = '123';
      renderWithRouter(<PaymentForm />);
      act(() =>
        userEvent.type(screen.getByRole('textbox', { name: 'CVC' }), value),
      );
      await act(async () => userEvent.click(await screen.findByText('Pay')));

      expect(window.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"cvc":"___"'),
        }),
      );
    });
  });

  describe('expiry', () => {
    const field = 'Expiry';
    itDisplaysATextbox(field);
    it('display value on the credit card', () => {
      const value = '0101';
      renderWithRouter(<PaymentForm />);
      act(() =>
        userEvent.type(screen.getByRole('textbox', { name: field }), value),
      );

      expect(Cards).toHaveBeenLastCalledWith(
        expect.objectContaining({
          expiry: '__/__',
        }),
        expect.anything(),
      );
    });

    it('sends expiry on submit', async () => {
      const value = '0101';
      renderWithRouter(<PaymentForm />);
      act(() =>
        userEvent.type(screen.getByRole('textbox', { name: field }), value),
      );
      await act(async () => userEvent.click(await screen.findByText('Pay')));

      expect(window.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"expiry":"__/__"'),
        }),
      );
    });
  });

  describe('save credit card', () => {
    it('display a checkbox for saving the credit card', () => {
      renderWithRouter(<PaymentForm />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('sends save credit card boolean on submit when selected', async () => {
      renderWithRouter(<PaymentForm />);
      act(() => userEvent.click(screen.getByRole('checkbox')));
      await act(async () => userEvent.click(await screen.findByText('Pay')));

      expect(window.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('"saveCreditCardInfo":true'),
        }),
      );
    });
  });

  it('display the BASIC price of $9.99/month', async () => {
    mockInitialEntries = ['?package=BASIC'];
    renderWithRouter(<PaymentForm />);

    expect(await screen.findByText('$9.99/month')).toBeInTheDocument();
  });

  it('display the PRO price of $14.99/month', async () => {
    mockInitialEntries = ['?package=PRO'];
    renderWithRouter(<PaymentForm />);

    expect(await screen.findByText('$14.99/month')).toBeInTheDocument();
  });

  it('display the ULTIMATE price of $19.99/month', async () => {
    mockInitialEntries = ['?package=ULTIMATE'];
    renderWithRouter(<PaymentForm />);

    expect(await screen.findByText('$19.99/month')).toBeInTheDocument();
  });
});
