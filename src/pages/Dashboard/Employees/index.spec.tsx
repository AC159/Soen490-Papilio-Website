import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EmployeeDashboard from '.';
import * as constant from './constant';
// import * as FormConstant from './AddForm/constant';
import { FORM_HEADLINE } from './AddForm/constant';

jest.mock('firebase/auth');
jest.mock('firebase/app');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    businessId: '12345',
  }),
}));

describe('logic test', () => {
  beforeEach(() => {
    window.fetch = jest.fn(async () =>
      await Promise.resolve({
        json: async () => await Promise.resolve({
          body: {
            employees: [{
              firebase_id: 'firebase_id',
              firstName: 'John',
              lastName: 'Doe',
              email: 'jdoe@email.com',
              role: 'Admin',
              createdAt: '1234-12-12',
              updatedAt: '1234-12-12',
              root: false,
              business_id: '12345',
            }],
          },
        }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('open add employee form test', async () => {
    render(<EmployeeDashboard />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    userEvent.click(screen.getByText(constant.ADD_EMPLOYEE_BUTTON));

    expect(await screen.findByText(FORM_HEADLINE)).toBeInTheDocument();
  });

  it('should fetch employee on page load', async () => {
    render(
      <BrowserRouter>
        <Routes location='/dashboard/12345'>
          <Route path='/dashboard/:businessId' element={<EmployeeDashboard />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(async () => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/business/get/12345/employees',
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(await screen.findByText(/John Doe/)).toBeInTheDocument();
    });
  });

  // it('should update on submit', async () => {
  //   render(
  //     <BrowserRouter>
  //       <Routes location='/dashboard/12345'>
  //         <Route path='/dashboard/:businessId' element={<EmployeeDashboard />} />
  //       </Routes>
  //     </BrowserRouter>
  //   );

  //   window.fetch
  //     .mockResolvedValueOnce({})
  //     .mockResolvedValueOnce({});

  //   userEvent.click(await screen.findByText(constant.ADD_EMPLOYEE_BUTTON));
  //   expect(await screen.findByText(FormConstant.FORM_HEADLINE)).toBeInTheDocument();
  //   const button = await screen.findAllByText(FormConstant.BUTTON_TEXT);

  //   userEvent.click(button[1]);
  // });
});
