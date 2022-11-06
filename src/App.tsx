import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/Dashboard/Employees';
import ActivityDashboard from './pages/Dashboard/Activities';
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
    element: (<LoginPage type='admin' />),
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
        path: 'activities',
        element: <ActivityDashboard />,
      },
      {
        path: 'ads',
        element: <div>Ad center</div>,
      },
    ],
  },
]);

const App = (): JSX.Element => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
