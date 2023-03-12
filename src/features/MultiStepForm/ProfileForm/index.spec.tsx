// import { AddressAutofill } from '@mapbox/search-js-react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import ProfilForm, { IFormData } from '.';

jest.mock('@mapbox/search-js-react', () => ({
  AddressAutofill: ({ children }: any) => <div>{children}</div>,
}));

const initialState: IFormData = {
  businessName: '',
  email: '',
  addressLineOne: '',
  addressLineTwo: '',
  postalCode: '',
  city: '',
  country: '',
  province: '',
};

const defaultProps = {
  initialState,
  onSubmit: async () => {},
};

describe('profile form test', () => {
  it('should have 7 inputs', async () => {
    const mockOnSubmit = jest.fn();
    render(<ProfilForm initialState={initialState} onSubmit={mockOnSubmit} />);

    const inputs = screen.getAllByRole('textbox');

    expect(inputs.length).toBe(8);
  });

  const itDisplaysATextBox = (name: string | RegExp): void =>
    it('displays a text box', () => {
      render(<ProfilForm {...defaultProps} />);
      expect(screen.getByRole('textbox', { name })).not.toBeNull();
    });

  const itDisplaysALabelWithTheCorrectValue = (name: string): void =>
    it('displays a label with the correct value', () => {
      render(<ProfilForm {...defaultProps} />);

      expect(screen.getByText(name)).toBeInTheDocument();
    });

  const itDisplaysInitialValue = (key: string, name: string): void =>
    it('displays the initial value on load', () => {
      const innerText = 'value';
      const state = { ...initialState, [key]: innerText };

      render(<ProfilForm {...defaultProps} initialState={state} />);

      expect(
        // @ts-expect-error
        screen.getByRole('textbox', { name }).value,
      ).toEqual(innerText);
    });

  const itSavesInitialValueOnSubmitting = (key: string): void =>
    it('saves initial value on submitting', async () => {
      const mockSubmit = jest.fn();
      const innerText = 'value';
      const state = { ...initialState, [key]: innerText };

      render(
        <ProfilForm
          {...defaultProps}
          initialState={state}
          onSubmit={mockSubmit}
        />,
      );

      await act(async () => userEvent.click(await screen.findByText(/Next/)));

      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          [key]: innerText,
        }),
      );
    });

  const itSavesNewValueOnSubmitting = (key: string, name: string): void =>
    it('saves new value on submitting', async () => {
      const mockSubmit = jest.fn();
      const innerText = 'value';

      render(<ProfilForm {...defaultProps} onSubmit={mockSubmit} />);

      await act(async () =>
        userEvent.type(await screen.findByRole('textbox', { name }), innerText),
      );
      await act(async () => userEvent.click(await screen.findByText(/Next/)));

      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          [key]: innerText,
        }),
      );
    });

  describe('businessName', () => {
    itDisplaysATextBox('Business name');
    itDisplaysALabelWithTheCorrectValue('Business name');
    itDisplaysInitialValue('businessName', 'Business name');
    itSavesInitialValueOnSubmitting('businessName');
    itSavesNewValueOnSubmitting('businessName', 'Business name');
  });
  describe('email', () => {
    // itDisplaysATextBox('Email');
    itDisplaysALabelWithTheCorrectValue('Email');
    itDisplaysInitialValue('email', 'Email');
    itSavesInitialValueOnSubmitting('email');
    itSavesNewValueOnSubmitting('email', 'Email');
  });
  describe('addressLineOne', () => {
    // itDisplaysATextBox('Address');
    itDisplaysALabelWithTheCorrectValue('Address');
    itDisplaysInitialValue('addressLineOne', 'Address');
    itSavesInitialValueOnSubmitting('addressLineOne');
    itSavesNewValueOnSubmitting('addressLineOne', 'Address');
  });
  describe('addressLineTwo', () => {});
  describe('city', () => {
    // itDisplaysATextBox('City');
    itDisplaysALabelWithTheCorrectValue('City');
    itDisplaysInitialValue('city', 'City');
    itSavesInitialValueOnSubmitting('city');
    itSavesNewValueOnSubmitting('city', 'City');
  });
  describe('province', () => {});
  describe('postalCode', () => {
    // itDisplaysATextBox('Postal code');
    itDisplaysALabelWithTheCorrectValue('Postal code');
    itDisplaysInitialValue('postalCode', 'Postal code');
    itSavesInitialValueOnSubmitting('postalCode');
    itSavesNewValueOnSubmitting('postalCode', 'Postal code');
  });
  describe('country', () => {});
});
