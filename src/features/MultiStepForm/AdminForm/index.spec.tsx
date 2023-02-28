import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import AdminForm, { IFormData } from '.';

const initialState: IFormData = {
  adminFirstName: '',
  adminLastName: '',
  adminEmail: '',
  adminPassword: '',
  role: 'Admin',
};

describe('profile form test', () => {
  it('should have 4 inputs', () => {
    const mockOnSubmit = jest.fn();
    const mockOnBack = jest.fn();
    render(
      <AdminForm
        initialState={initialState}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />,
    );

    const inputs = screen.getAllByRole('textbox');

    expect(inputs.length).toBe(5);
  });

  it('should accept inputs and send data on submit', async () => {
    const mockOnSubmit = jest.fn();
    const mockOnBack = jest.fn();
    render(
      <AdminForm
        initialState={initialState}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />,
    );

    await act(async () =>
      userEvent.type(
        await screen.findByRole('textbox', { name: /First name/i }),
        'John',
      ),
    );
    await act(async () =>
      userEvent.type(
        await screen.findByRole('textbox', { name: /Last name/i }),
        'Doe',
      ),
    );
    await act(async () =>
      userEvent.type(
        await screen.findByRole('textbox', { name: /Email/i }),
        'jdoe@email.com',
      ),
    );
    await act(async () =>
      userEvent.type(
        await screen.findByRole('textbox', { name: /Password/i }),
        'password',
      ),
    );
    await act(async () => userEvent.click(await screen.findByText('Next')));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      adminFirstName: 'John',
      adminLastName: 'Doe',
      adminEmail: 'jdoe@email.com',
      adminPassword: 'password',
      role: 'Admin',
    });
  });

  it('should send inputs value to save when back', async () => {
    const mockOnSubmit = jest.fn();
    const mockOnBack = jest.fn();
    render(
      <AdminForm
        initialState={initialState}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />,
    );

    await act(async () =>
      userEvent.type(
        await screen.findByRole('textbox', { name: /First name/i }),
        'John',
      ),
    );
    await act(async () =>
      userEvent.type(
        await screen.findByRole('textbox', { name: /Last name/i }),
        'Doe',
      ),
    );
    await act(async () =>
      userEvent.type(
        screen.getByRole('textbox', { name: /Email/i }),
        'jdoe@email.com',
      ),
    );
    await act(async () =>
      userEvent.type(
        screen.getByRole('textbox', { name: /Password/i }),
        'password',
      ),
    );
    await act(async () => userEvent.click(screen.getByText('Back')));

    expect(mockOnBack).toHaveBeenCalledWith({
      adminFirstName: 'John',
      adminLastName: 'Doe',
      adminEmail: 'jdoe@email.com',
      adminPassword: 'password',
      role: 'Admin',
    });
  });
});
