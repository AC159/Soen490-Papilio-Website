/* eslint-disable @typescript-eslint/return-await */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import AddForm from '.';
import * as constant from './constant';

const defaultProps = {
  onSubmit: async (): Promise<void> => {},
};

const getErrorSpan = (component): any =>
  component.parentElement?.nextElementSibling;

const fillOtherInputs = (component: null | HTMLElement = null): void =>
  screen
    .getAllByRole('textbox')
    .filter((textbox) => textbox !== component)
    .forEach((textbox) => {
      act(() => userEvent.type(textbox, 'as'));
    });

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

  it('initially display an enabled submit button', () => {
    render(<AddForm {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: constant.BUTTON_TEXT }),
    ).not.toBeDisabled();
  });

  it('calls onSubmit when submit button is clicked', async () => {
    const mockOnSubmit = jest.fn();
    render(<AddForm onSubmit={mockOnSubmit} />);
    fillOtherInputs();
    act(() =>
      userEvent.click(
        screen.getByRole('button', { name: constant.BUTTON_TEXT }),
      ),
    );
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it('disables onSubmit button while waiting for the form to be submitted', async () => {
    const mockOnSubmit = jest.fn();
    render(<AddForm onSubmit={mockOnSubmit} />);
    fillOtherInputs();
    act(() =>
      userEvent.click(
        screen.getByRole('button', { name: constant.BUTTON_TEXT }),
      ),
    );
    await waitFor(async () =>
      expect(
        await screen.findByRole('button', { name: constant.BUTTON_TEXT }),
      ).toBeDisabled(),
    );
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

      act(() => userEvent.type(screen.getByRole('textbox', { name }), value));

      expect(await screen.findByRole('textbox', { name })).toHaveProperty(
        'value',
        value,
      );
    });

  const itSubmitsFieldValueWhenSubmitting = (
    name: string,
    field: string,
  ): void =>
    it(`submits ${field} value when submitting`, async () => {
      const mockOnSubmit = jest.fn();
      const value = 'value';
      render(<AddForm onSubmit={mockOnSubmit} />);

      act(() => userEvent.type(screen.getByRole('textbox', { name }), value));
      fillOtherInputs(screen.getByRole('textbox', { name }));
      act(() =>
        userEvent.click(
          screen.getByRole('button', { name: constant.BUTTON_TEXT }),
        ),
      );

      await waitFor(() =>
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            [field]: value,
          }),
        ),
      );
    });

  const itDisplaysNoErrorMessageWhenNoError = (name: string): void =>
    it('display no error message when there are no error', async () => {
      const mockOnSubmit = jest.fn();
      const value = 'value';
      render(<AddForm onSubmit={mockOnSubmit} />);

      act(() => userEvent.type(screen.getByRole('textbox', { name }), value));
      fillOtherInputs(screen.getByRole('textbox', { name }));
      act(() =>
        userEvent.click(
          screen.getByRole('button', { name: constant.BUTTON_TEXT }),
        ),
      );

      await waitFor(async () =>
        expect(
          getErrorSpan(await screen.findByRole('textbox', { name })),
        ).toBeEmptyDOMElement(),
      );
    });

  const itDisplaysAnErrorWhenFieldIsTooShort = (): void =>
    it('displays an error message when the first name is too short', async () => {
      const mockOnSubmit = jest.fn();
      const value = 'v';
      render(<AddForm onSubmit={mockOnSubmit} />);

      act(() =>
        userEvent.type(
          screen.getByRole('textbox', {
            name: constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL,
          }),
          value,
        ),
      );
      act(() =>
        userEvent.click(
          screen.getByRole('button', { name: constant.BUTTON_TEXT }),
        ),
      );

      await waitFor(async () =>
        expect(
          getErrorSpan(
            await screen.findByRole('textbox', {
              name: constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL,
            }),
          ),
        ).not.toBeEmptyDOMElement(),
      );
    });

  describe('firstName', () => {
    itDisplaysATextBox(constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL);
    itSavesFieldWhenTypeIntoTextBox(constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL);
    itSubmitsFieldValueWhenSubmitting(
      constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL,
      'employeeFirstName',
    );
    itDisplaysNoErrorMessageWhenNoError(
      constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL,
    );
    itDisplaysAnErrorWhenFieldIsTooShort();
  });

  describe('lastName', () => {
    itDisplaysATextBox(constant.INPUT_EMPLOYEE_LAST_NAME_LABEL);
    itSavesFieldWhenTypeIntoTextBox(constant.INPUT_EMPLOYEE_LAST_NAME_LABEL);
    itSubmitsFieldValueWhenSubmitting(
      constant.INPUT_EMPLOYEE_LAST_NAME_LABEL,
      'employeeLastName',
    );
    itDisplaysNoErrorMessageWhenNoError(
      constant.INPUT_EMPLOYEE_LAST_NAME_LABEL,
    );
  });

  describe('email', () => {
    itDisplaysATextBox(constant.INPUT_EMPLOYEE_EMAIL_LABEL);
    itSavesFieldWhenTypeIntoTextBox(constant.INPUT_EMPLOYEE_EMAIL_LABEL);
    itSubmitsFieldValueWhenSubmitting(
      constant.INPUT_EMPLOYEE_EMAIL_LABEL,
      'employeeEmail',
    );
    itDisplaysNoErrorMessageWhenNoError(constant.INPUT_EMPLOYEE_EMAIL_LABEL);
  });

  describe('role', () => {
    itDisplaysATextBox(constant.INPUT_ROLE_LABEL);
    itSavesFieldWhenTypeIntoTextBox(constant.INPUT_ROLE_LABEL);
    itSubmitsFieldValueWhenSubmitting(constant.INPUT_ROLE_LABEL, 'role');
    itDisplaysNoErrorMessageWhenNoError(constant.INPUT_ROLE_LABEL);
  });
});
