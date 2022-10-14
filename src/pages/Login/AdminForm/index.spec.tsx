// import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import AdminForm from '.';
import * as constant from './constant';

test('logic test', () => {
  const mockOnSubmit = jest.fn();

  render(
    <MemoryRouter>
      <AdminForm onSubmit={mockOnSubmit} />
    </MemoryRouter>
  );

  expect(screen.getByText(constant.FORM_HEADING)).toBeInTheDocument();
  userEvent.type(screen.getByPlaceholderText(constant.INPUT_ADMIN_NAME_PLACEHOLDER), 'John Doe');
  userEvent.type(screen.getByPlaceholderText(constant.INPUT_ADMIN_EMAIL_PLACEHOLDER), 'jd@email.com');
  userEvent.type(screen.getByPlaceholderText(constant.INPUT_ADMIN_PASSWORD_PLACEHOLDER), 'password');
  userEvent.click(screen.getByText(constant.SUBMIT_BUTTON_TEXT));

  expect(mockOnSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      [constant.INPUT_ADMIN_NAME]: 'John Doe',
      [constant.INPUT_ADMIN_EMAIL]: 'jd@email.com',
      [constant.INPUT_ADMIN_PASSWORD]: 'password',
    })
  );
});
