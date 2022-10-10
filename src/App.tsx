import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/Dashboard/Employees';
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
    path: ':businessId/dashboard/',
    element: (<Dashboard />),
    children: [{
      path: 'employees',
      element: <EmployeeDashboard />,
    }],
  },
]);

const App = (): JSX.Element => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
