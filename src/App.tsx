import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/Dashboard/Employees';
import ActivityDashboard from './pages/Dashboard/Activities';
import ProfileDashboard from './pages/Dashboard/Profile';
import AdsDashboard from './pages/Dashboard/AdCenter';
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

import { AuthProvider } from './context/employeeContext';
import HomeDashboard from './pages/Dashboard/Home';

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
