/* eslint-disable no-import-assign */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as auth from 'firebase/auth';

import LoginPage from '.';
import * as businessConstant from './BusinessForm/constant';
import * as ProfileConstant from '../../features/MultiStepForm/ProfileForm/constant';
import * as AdminConstant from '../../features/MultiStepForm/AdminForm/constant';
import { AuthProvider } from '../../context/employeeContext';
import * as API from '../../api/apiLayer';

jest.mock('firebase/auth');
jest.mock('../../api/apiLayer', () => ({
  getBusiness: jest.fn(),
  register: jest.fn(),
  addBusiness: jest.fn(),
}));

describe('logic test', () => {
  afterEach(() => {
    (API.getBusiness as jest.MockedFunction<typeof API.getBusiness>).mockClear();
    (API.addBusiness as jest.MockedFunction<typeof API.addBusiness>).mockClear();
    (API.register as jest.MockedFunction<typeof API.register>).mockClear();
  });

  test('login page business successful business creation', async () => {
    // @ts-expect-error
    API.getBusiness.mockReturnValue(Promise.resolve({
      status: 200,
    }));

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
    expect(API.getBusiness).toHaveBeenCalledWith('');
  });

  test('login page business unsuccessful business creation', async () => {
    // @ts-expect-error
    API.getBusiness.mockReturnValue(Promise.resolve({
      status: 400,
    }));

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

    userEvent.click(screen.getByText(businessConstant.SUBMIT_BUTTON_TEXT));

    expect(screen.queryByText(/ADMIN PAGE/)).not.toBeInTheDocument();
    expect(screen.getByText(businessConstant.FORM_HEADING)).toBeInTheDocument();
    expect(API.getBusiness).toHaveBeenCalledWith('');
  });

  test('login page business logic successful business creation', async () => {
    // @ts-expect-error
    (API.addBusiness as jest.MockedFunction<typeof API.addBusiness>).mockResolvedValueOnce({
      status: 200,
    });
    (API.register as jest.MockedFunction<typeof API.register>).mockResolvedValue({
      name: 'John',
      role: 'Admin',
      firebaseId: 'firebase-id',
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
    expect(API.register).toHaveBeenCalled();
  });

  test('login page business logic unsuccessful business creation', async () => {
    // @ts-expect-error
    (API.addBusiness as jest.MockedFunction<typeof API.addBusiness>).mockResolvedValueOnce({
      status: 400,
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

    userEvent.click(screen.getByText(/Next/));
    userEvent.click(await screen.findByText(/Next/));
    userEvent.click(await screen.findByText(/submit/));
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(screen.queryByText(/DASHBOARD PAGE/)).not.toBeInTheDocument();
    expect(await screen.findByText(/Yeah/)).toBeInTheDocument();
    expect(API.register).not.toHaveBeenCalled();
  });

  test('login page business logic unsuccessful business creation', async () => {
    // @ts-expect-error
    (API.addBusiness as jest.MockedFunction<typeof API.addBusiness>).mockResolvedValueOnce({
      status: 400,
    });
    // @ts-expect-error
    auth.createUserWithEmailAndPassword.mockReturnValueOnce(
      Promise.reject(new Error('an error occur')));

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

    userEvent.click(screen.getByText(/Next/));
    userEvent.click(await screen.findByText(/Next/));
    userEvent.click(await screen.findByText(/submit/));
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(screen.queryByText(/DASHBOARD PAGE/)).not.toBeInTheDocument();
    expect(await screen.findByText(/Yeah/)).toBeInTheDocument();
    expect(API.addBusiness).not.toHaveBeenCalled();
    expect(API.register).not.toHaveBeenCalled();
  });
});
