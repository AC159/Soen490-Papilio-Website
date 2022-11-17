import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/Dashboard/Employees';
import ProfileDashboard from './pages/Dashboard/Profile';
import ErrorPage from './pages/Error';
import LoginPage from './pages/Login';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/employeeContext';

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
]);

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
};

export default App;
