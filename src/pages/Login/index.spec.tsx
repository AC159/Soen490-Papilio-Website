/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-import-assign */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as auth from 'firebase/auth';

import LoginPage from '.';
import { AuthProvider } from '../../context/employeeContext';
import * as API from '../../api/apiLayer';

const fetchResponse = (status: any) => ({ status });
let mockData: any;

const MockComponent = ({ id, onSubmit }: any) => (
  <div data-testid={id}>
    <button onClick={() => onSubmit(mockData)} />
  </div>
);

jest.mock('../../features/MultiStepForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <MockComponent id="businessLogic" onSubmit={onSubmit} />
  ),
}));
jest.mock('./BusinessForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <MockComponent id="business" onSubmit={onSubmit} />
  ),
}));
jest.mock('./LoginForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <MockComponent id="login" onSubmit={onSubmit} />
  ),
}));

jest.mock('firebase/auth');
jest.mock('../../api/apiLayer', () => ({
  getBusiness: jest.fn(),
  register: jest.fn(),
  addBusiness: jest.fn(),
  login: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/prop-types
const TestWrapper = ({ children, initialEntries = [{}] }: any) => (
  <AuthProvider>
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  </AuthProvider>
);

const renderRoutes = (
  formType: 'businessLogic' | 'business' | 'login',
  testId: string,
  initialEntries?: any[],
) =>
  render(
    <TestWrapper initialEntries={initialEntries}>
      <Routes>
        <Route path="" element={<LoginPage type={formType} />} />
        <Route path={testId} element={<div data-testid={testId} />} />
      </Routes>
    </TestWrapper>,
  );

describe('login', () => {
  const firebaseUser = {
    user: {
      uid: 'firebase-id',
    },
  };

  const itRendersTheCorrectFormForTheType = (
    type: 'businessLogic' | 'business' | 'login',
  ) =>
    it(`renders the correct form for the type ${type}`, () => {
      render(
        <TestWrapper>
          <LoginPage type={type} />
        </TestWrapper>,
      );

      expect(screen.getByTestId(type)).not.toBeNull();
    });

  describe('business logic', () => {
    const intialEntries = [{ state: { businessId: '1234' } }];

    beforeEach(() => {
      mockData = {
        adminAccount: {
          adminEmail: 'email@test.com',
          adminPassword: 'password',
        },
        profile: {
          businessName: '',
          addressLineOne: '',
          addressLineTwo: '',
          province: '',
        },
        businessId: '1234',
      };

      // @ts-expect-error
      auth.createUserWithEmailAndPassword.mockResolvedValue(firebaseUser);
      // @ts-expect-error
      API.addBusiness.mockResolvedValue(fetchResponse(400));
    });

    itRendersTheCorrectFormForTheType('businessLogic');

    it('renders the dashboard page on successful business creation', async () => {
      // @ts-expect-error
      API.addBusiness.mockResolvedValueOnce(fetchResponse(200));
      // @ts-expect-error
      API.register.mockResolvedValue({
        name: 'John',
        role: 'Admin',
        firebaseId: 'firebase-id',
      });
      renderRoutes('businessLogic', '/1234/dashboard', intialEntries);

      await act(async () => userEvent.click(await screen.findByRole('button')));

      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        undefined,
        mockData.adminAccount.adminEmail,
        mockData.adminAccount.adminPassword,
      );
      expect(API.addBusiness).toHaveBeenCalledWith({
        business: expect.objectContaining({}),
        employee: expect.objectContaining({}),
      });
      expect(API.register).toHaveBeenCalledWith(
        expect.objectContaining({
          businessId: '1234',
          firebaseId: 'firebase-id',
        }),
      );
      expect(await screen.findByTestId('/1234/dashboard')).toBeInTheDocument();
    });

    it('stays on page on unsuccessful business creation', async () => {
      renderRoutes('businessLogic', '/1234/dashboard', intialEntries);

      await act(async () => userEvent.click(await screen.findByRole('button')));

      expect(screen.queryByTestId('/1234/dashboard')).not.toBeInTheDocument();
      expect(await screen.findByTestId('businessLogic')).toBeInTheDocument();
      expect(API.register).not.toHaveBeenCalled();
    });

    it('stays on page on firebase error', async () => {
      // @ts-expect-error
      auth.createUserWithEmailAndPassword.mockRejectedValue(
        new Error('an error occur'),
      );

      renderRoutes('businessLogic', '/1234/dashboard', intialEntries);

      await act(async () => userEvent.click(await screen.findByRole('button')));

      expect(screen.queryByTestId('/1234/dashboard')).not.toBeInTheDocument();
      expect(await screen.findByTestId('businessLogic')).toBeInTheDocument();
    });

    it('sends address field within the business object as string', async () => {
      renderRoutes('businessLogic', '/1234/dashboard', intialEntries);

      await act(async () => userEvent.click(await screen.findByRole('button')));

      expect(API.addBusiness).toHaveBeenCalledWith(
        expect.objectContaining({
          business: expect.objectContaining({
            address: expect.any(String),
          }),
        }),
      );
    });

    it('combines the address fields into a single field in the correct order', async () => {
      mockData = {
        ...mockData,
        profile: {
          businessName: '',
          email: '',
          addressLineOne: '1234 Main Street',
          addressLineTwo: '',
          postalCode: 'W3E 2E3',
          city: 'Montreal',
          country: 'Canada',
          province: 'QC',
        },
      };
      const expected = '1234 Main Street, Montreal, QC, W3E 2E3, Canada';

      renderRoutes('businessLogic', '/1234/dashboard', intialEntries);

      await act(async () => userEvent.click(await screen.findByRole('button')));

      expect(API.addBusiness).toHaveBeenCalledWith(
        expect.objectContaining({
          business: expect.objectContaining({
            address: expected,
          }),
        }),
      );
    });

    it('combines the address fields with the appartment number into a single field in the correct order', async () => {
      mockData = {
        ...mockData,
        profile: {
          businessName: '',
          email: '',
          addressLineOne: '1234 Main Street',
          addressLineTwo: 'Box 168',
          postalCode: 'W3E 2E3',
          city: 'Montreal',
          country: 'Canada',
          province: 'QC',
        },
      };
      const expected =
        'Box 168-1234 Main Street, Montreal, QC, W3E 2E3, Canada';

      renderRoutes('businessLogic', '/1234/dashboard', intialEntries);

      await act(async () => userEvent.click(await screen.findByRole('button')));

      expect(API.addBusiness).toHaveBeenCalledWith(
        expect.objectContaining({
          business: expect.objectContaining({
            address: expected,
          }),
        }),
      );
    });
  });

  describe('business', () => {
    beforeEach(() => {
      mockData = {
        businessId: 'businessId',
      };
      // @ts-expect-error
      API.getBusiness.mockResolvedValue(fetchResponse(200));
    });

    itRendersTheCorrectFormForTheType('business');

    it('renders Admin page on successful business creation', async () => {
      renderRoutes('business', 'admin');

      userEvent.click(await screen.findByRole('button'));

      expect(await screen.findByTestId('admin')).toBeInTheDocument();
      expect(API.getBusiness).toHaveBeenCalledWith('businessId');
    });

    it('stays on page on unsuccessful business creation', async () => {
      // @ts-expect-error
      API.getBusiness.mockResolvedValueOnce(fetchResponse(400));
      renderRoutes('business', 'admin');

      userEvent.click(await screen.findByRole('button'));

      expect(screen.queryByTestId('admin')).not.toBeInTheDocument();
      expect(await screen.findByTestId('business')).toBeInTheDocument();
    });
  });

  describe('login', () => {
    beforeEach(() => {
      mockData = {
        email: 'email@test.com',
        password: 'password',
        businessId: '1234',
      };
    });

    itRendersTheCorrectFormForTheType('login');

    it('renders the dashboard page when entering correct information', async () => {
      (API.login as jest.MockedFunction<typeof API.login>).mockResolvedValue({
        name: '',
        firebaseId: 'firebase-id',
        businessId: '1234',
        role: 'admin',
      });
      // @ts-expect-error
      auth.signInWithEmailAndPassword.mockResolvedValue(firebaseUser);
      renderRoutes('login', '/1234/dashboard');

      await act(async () => userEvent.click(await screen.findByRole('button')));

      expect(await screen.findByTestId('/1234/dashboard')).toBeInTheDocument();
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalled();
      expect(API.login).toHaveBeenCalledWith(
        expect.objectContaining({
          firebaseId: 'firebase-id',
          businessId: '1234',
        }),
      );
    });
  });
});
