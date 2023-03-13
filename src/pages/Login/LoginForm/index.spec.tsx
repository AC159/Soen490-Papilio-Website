import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import LoginForm from '.';
import * as constant from './constant';

test('LoginForm', async () => {
  const mockonSubmit = jest.fn();

  render(
    <MemoryRouter>
      <LoginForm onSubmit={mockonSubmit} />
    </MemoryRouter>,
  );

  expect(screen.getByText(constant.FORM_HEADING)).toBeInTheDocument();
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(constant.INPUT_EMAIL_PLACEHOLDER),
      'login@email.com',
    ),
  );
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(constant.INPUT_PASSWORD_PLACEHOLDER),
      'password',
    ),
  );
  await act(async () =>
    userEvent.click(await screen.findByText(constant.SUBMIT_BUTTON_TEXT)),
  );

  await waitFor(() => {
    expect(mockonSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        [constant.INPUT_EMAIL]: 'login@email.com',
        [constant.INPUT_PASSWORD]: 'password',
      }),
    );
  });
});
