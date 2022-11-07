import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProfilForm, { IFormData } from '.';

const initialState: IFormData = {
  businessName: '',
  addressLineOne: '',
  addressLineTwo: '',
  postalCode: '',
  city: '',
  country: '',
  province: '',
};

describe('profile form test', () => {
  it('should have 7 inputs', async () => {
    const mockOnSubmit = jest.fn();
    render(<ProfilForm initialState={initialState} onSubmit={mockOnSubmit}/>);

    const inputs = screen.getAllByRole('textbox');

    expect(inputs.length).toBe(7);
  });

  it('should accept inputs and send data on submit', async () => {
    const mockOnSubmit = jest.fn();
    render(<ProfilForm initialState={initialState} onSubmit={mockOnSubmit} />);

    userEvent.type(screen.getByRole('textbox', { name: /Business name/i }), 'My Awesome Business');
    userEvent.type(screen.getByRole('textbox', { name: /Address/i }), '1234 Awesome St');
    userEvent.type(screen.getByRole('textbox', { name: /Postal Code/i }), 'H3B 5G1');
    userEvent.type(screen.getByRole('textbox', { name: /City/i }), 'Montreal');
    userEvent.type(screen.getByRole('textbox', { name: /Province/i }), 'QC');
    userEvent.type(screen.getByRole('textbox', { name: /Country/i }), 'Canada');
    userEvent.click(screen.getByText('Next'));

    expect(mockOnSubmit).toHaveBeenCalledWith(
      {
        businessName: 'My Awesome Business',
        addressLineOne: '1234 Awesome St',
        addressLineTwo: '',
        postalCode: 'H3B 5G1',
        city: 'Montreal',
        country: 'Canada',
        province: 'QC',
      }
    );
  });
});
