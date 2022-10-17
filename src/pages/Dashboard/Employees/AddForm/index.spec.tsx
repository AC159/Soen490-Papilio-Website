// import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddForm from '.';
import * as constant from './constant';

test('logic test', () => {
  const mockOnSubmit = jest.fn();

  render(<AddForm onSubmit={mockOnSubmit} />);

  expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
  userEvent.type(screen.getByPlaceholderText(constant.INPUT_EMPLOYEE_NAME_PLACEHOLDER), 'John Doe');
  userEvent.type(screen.getByPlaceholderText(constant.INPUT_EMPLOYEE_EMAIL_PLACEHOLDER), 'jd@email.com');
  userEvent.type(screen.getByPlaceholderText(constant.INPUT_ROLE_PLACEHOLDER), 'admin');
  userEvent.click(screen.getByText(constant.BUTTON_TEXT));

  expect(mockOnSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      [constant.INPUT_EMPLOYEE_NAME]: 'John Doe',
      [constant.INPUT_EMPLOYEE_EMAIL]: 'jd@email.com',
      [constant.INPUT_ROLE]: 'admin',
    })
  );
});
