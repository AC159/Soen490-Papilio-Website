import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/Dashboard/Employees';
import ProfileDashboard from './pages/Dashboard/Profile';
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<LoginPage type='business' />),
    errorElement: (<ErrorPage />),
  },
  {
    path: '/admin',
    element: (<LoginPage type='businessLogic' />),
    errorElement: (<ErrorPage />),
  },
  {
    path: ':businessId/dashboard/',
    element: (<Dashboard />),
    children: [
      {
        element: <div>Home</div>,
      },
      {
        path: 'employees',
        element: <EmployeeDashboard />,
      },
      {
        path: 'events',
        element: <div>Event Manager</div>,
      },
      {
        path: 'ads',
        element: <div>Ad center</div>,
      },
      {
        path: 'profile',
        element: <ProfileDashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: (<LoginPage type='login' />),
    errorElement: (<ErrorPage />),
  },
]);

const App = (): JSX.Element => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
