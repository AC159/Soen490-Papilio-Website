import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EmployeeDashboard from '.';
import * as constant from './constant';
import { FORM_HEADLINE } from './AddForm/constant';

test('logic test', async () => {
  render(<EmployeeDashboard />);

  expect(screen.getByRole('table')).toBeInTheDocument();
  userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));

  expect(await screen.findByText(FORM_HEADLINE)).toBeInTheDocument();
});
