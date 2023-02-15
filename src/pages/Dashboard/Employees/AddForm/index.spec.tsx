/* eslint-disable @typescript-eslint/return-await */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import AddForm from '.';
import * as constant from './constant';

const defaultProps = {
  onSubmit: async (): Promise<void> => {},
};

describe('Employee AddForm', () => {
  it('displays form header', () => {
    render(<AddForm {...defaultProps} />);
    expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
  });

  it('displays a submit button', () => {
    render(<AddForm {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: constant.BUTTON_TEXT }),
    ).toBeInTheDocument();
  });

  it('calls onSubmit when submit button is clicked', async () => {
    const mockOnSubmit = jest.fn();
    render(<AddForm onSubmit={mockOnSubmit} />);

    userEvent.click(screen.getByRole('button', { name: constant.BUTTON_TEXT }));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
    await act(async () => await Promise.resolve());
  });

  const itDisplaysATextBox = (name: string): void =>
    it('displays a textbox', () => {
      render(<AddForm {...defaultProps} />);
      expect(screen.getByRole('textbox', { name }));
    });

  const itSavesFieldWhenTypeIntoTextBox = (name: string): void =>
    it('saves field when typed into textbox', async () => {
      const value = 'value';
      render(<AddForm {...defaultProps} />);

      userEvent.type(screen.getByRole('textbox', { name }), value);

      expect(await screen.findByRole('textbox', { name })).toHaveProperty(
        'value',
        value,
      );
    });

  const itSubmitsFieldValueWhenSubmitting = (
    name: string,
    field: string,
  ): void =>
    it('submits firstName value when submitting', async () => {
      const mockOnSubmit = jest.fn();
      const value = 'value';
      render(<AddForm onSubmit={mockOnSubmit} />);

      userEvent.type(screen.getByRole('textbox', { name }), value);
      userEvent.click(
        screen.getByRole('button', { name: constant.BUTTON_TEXT }),
      );

      await waitFor(() =>
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            [field]: value,
          }),
        ),
      );
    });

  describe('firstName', () => {
    itDisplaysATextBox(constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL);
    itSavesFieldWhenTypeIntoTextBox(constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL);
    itSubmitsFieldValueWhenSubmitting(
      constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL,
      'employeeFirstName',
    );
  });

  describe('lastName', () => {
    itDisplaysATextBox(constant.INPUT_EMPLOYEE_LAST_NAME_LABEL);
    itSavesFieldWhenTypeIntoTextBox(constant.INPUT_EMPLOYEE_LAST_NAME_LABEL);
    itSubmitsFieldValueWhenSubmitting(
      constant.INPUT_EMPLOYEE_LAST_NAME_LABEL,
      'employeeLastName',
    );
  });

  describe('email', () => {
    itDisplaysATextBox(constant.INPUT_EMPLOYEE_EMAIL_LABEL);
    itSavesFieldWhenTypeIntoTextBox(constant.INPUT_EMPLOYEE_EMAIL_LABEL);
    itSubmitsFieldValueWhenSubmitting(
      constant.INPUT_EMPLOYEE_EMAIL_LABEL,
      'employeeEmail',
    );
  });

  describe('role', () => {
    itDisplaysATextBox(constant.INPUT_ROLE_LABEL);
    itSavesFieldWhenTypeIntoTextBox(constant.INPUT_ROLE_LABEL);
    itSubmitsFieldValueWhenSubmitting(constant.INPUT_ROLE_LABEL, 'role');
  });
});
