import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/Dashboard/Employees';
import ActivityDashboard from './pages/Dashboard/Activities';
import ProfileDashboard from './pages/Dashboard/Profile';
import AdsDashboard from './pages/Dashboard/AdCenter';
import Billing from './pages/Dashboard/Billing';
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import { AuthProvider } from './context/employeeContext';
import HomeDashboard from './pages/Dashboard/Home';
import PaymentForm from './pages/Dashboard/Billing/PaymentForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <LoginPage type="business" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/payment',
    element: <PaymentForm/>,
  },
  {
    path: '/admin',
    element: <LoginPage type="businessLogic" />,
    errorElement: <ErrorPage />,
  },
  {
    path: ':businessId/dashboard/',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <HomeDashboard />,
      },
      {
        path: 'employees',
        element: <EmployeeDashboard />,
      },
      {
        path: 'activities',
        element: <ActivityDashboard />,
      },
      {
        path: 'ads',
        element: <AdsDashboard />,
      },
      {
        path: 'billing',
        element: <Billing />,
      },
      {
        path: 'profile',
        element: <ProfileDashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage type="login" />,
    errorElement: <ErrorPage />,
  },
]);

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
