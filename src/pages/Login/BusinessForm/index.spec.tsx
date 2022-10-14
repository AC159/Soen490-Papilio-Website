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
  userEvent.type(screen.getByPlaceholderText(constant.INPUT_BUSINESS_PLACEHOLDER), 'MyAmazingBillionDollarCompany');

  userEvent.click(screen.getByText(constant.SUBMIT_BUTTON_TEXT));

  expect(mockOnSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      [constant.INPUT_BUSINESS_ID]: 'MyAmazingBillionDollarCompany',
    })
  );
});
