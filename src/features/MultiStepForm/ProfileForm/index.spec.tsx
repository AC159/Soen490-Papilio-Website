import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import ProfilForm, { IFormData } from '.';

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

    expect(inputs.length).toBe(6);
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

      userEvent.type(await screen.findByRole('textbox', { name }), innerText);
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
    itDisplaysATextBox('Email');
    itDisplaysALabelWithTheCorrectValue('Email');
    itDisplaysInitialValue('email', 'Email');
    itSavesInitialValueOnSubmitting('email');
    itSavesNewValueOnSubmitting('email', 'Email');
  });
  describe('addressLineOne', () => {
    itDisplaysATextBox('Address');
    itDisplaysALabelWithTheCorrectValue('Address');
    itDisplaysInitialValue('addressLineOne', 'Address');
    itSavesInitialValueOnSubmitting('addressLineOne');
    itSavesNewValueOnSubmitting('addressLineOne', 'Address');
  });
  describe('addressLineTwo', () => {});
  describe('city', () => {
    itDisplaysATextBox('City');
    itDisplaysALabelWithTheCorrectValue('City');
    itDisplaysInitialValue('city', 'City');
    itSavesInitialValueOnSubmitting('city');
    itSavesNewValueOnSubmitting('city', 'City');
  });
  describe('province', () => {});
  describe('postalCode', () => {
    itDisplaysATextBox('Postal code');
    itDisplaysALabelWithTheCorrectValue('Postal code');
    itDisplaysInitialValue('postalCode', 'Postal code');
    itSavesInitialValueOnSubmitting('postalCode');
    itSavesNewValueOnSubmitting('postalCode', 'Postal code');
  });
  describe('country', () => {});

  it('should accept inputs and send data on submit', async () => {
    const mockOnSubmit = jest.fn();
    render(<ProfilForm initialState={initialState} onSubmit={mockOnSubmit} />);

    userEvent.type(
      await screen.findByRole('textbox', { name: /Business name/i }),
      'My Awesome Business',
    );
    userEvent.type(
      await screen.findByRole('textbox', { name: /Address/i }),
      '1234 Awesome St',
    );
    userEvent.type(
      await screen.findByRole('textbox', { name: /Postal Code/i }),
      'H3B 5G1',
    );
    userEvent.type(
      await screen.findByRole('textbox', { name: /City/i }),
      'Montreal',
    );
    // userEvent.type(
    //   await screen.findByRole('textbox', { name: /Province/i }),
    //   'QC',
    // );
    // userEvent.type(
    //   await screen.findByRole('textbox', { name: /Country/i }),
    //   'Canada',
    // );
    userEvent.click(await screen.findByText('Next'));

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          businessName: 'My Awesome Business',
          addressLineOne: '1234 Awesome St',
          addressLineTwo: '',
          postalCode: 'H3B 5G1',
          city: 'Montreal',
          // country: 'Canada',
          // province: 'QC',
        }),
      ),
    );
  });
});
