import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '.';
import * as businessConstant from './BusinessForm/constant';
import * as auth from 'firebase/auth';
import * as ProfileConstant from '../../features/MultiStepForm/ProfileForm/constant';
import * as AdminConstant from '../../features/MultiStepForm/AdminForm/constant';
import { AuthProvider } from '../../context/employeeContext';

jest.mock('firebase/auth');

describe('logic test', () => {
  global.fetch = jest.fn(async () =>
    await Promise.resolve({
      json: async () => await Promise.resolve({ test: 100 }),
    })
  ) as jest.Mock;

  beforeEach(() => {
    // @ts-expect-error
    global.fetch.mockClear();
  });

  test('login page business test', async () => {
    // @ts-expect-error
    fetch.mockResolvedValueOnce({
      status: 200,
    });

    render(
      <AuthProvider>
        <MemoryRouter>
          <Routes>
            <Route path='' element={<LoginPage type='business' />} />
            <Route path='admin' element={<div>ADMIN PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText(businessConstant.FORM_HEADING)).toBeInTheDocument();
    userEvent.click(screen.getByText(businessConstant.SUBMIT_BUTTON_TEXT));

    expect(await screen.findByText(/ADMIN PAGE/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
  });

  test('login page admin test', async () => {
    // @ts-expect-error
    fetch.mockResolvedValueOnce({
      status: 200,
    });
    // @ts-expect-error
    auth.createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        uid: 'firebase-id',
      },
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[{ state: { businessId: '1234' } }]}>
          <Routes>
            <Route path="" element={<LoginPage type='businessLogic' />} />
            <Route path="/1234/dashboard" element={<div>DASHBOARD PAGE</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByRole('heading', { name: ProfileConstant.FORM_TITLE })).toBeInTheDocument();
    userEvent.click(screen.getByText(/Next/));
    expect(await screen.findByRole('heading', { name: AdminConstant.FORM_TITLE })).toBeInTheDocument();
    userEvent.click(await screen.findByText(/Next/));
    expect(await screen.findByText(/submit/)).toBeInTheDocument();
    userEvent.click(await screen.findByText(/submit/));
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(await screen.findByText(/DASHBOARD PAGE/)).toBeInTheDocument();
  });
});
