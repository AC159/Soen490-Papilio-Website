import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardContainer from '../../features/DashboardContainer';
import { useAuth } from '../../hooks/useEmployee';

const Dashboard = (): JSX.Element => {
  const { employee, login } = useAuth();
  useEffect(() => {
    login({
      firebaseId: employee.firebaseId,
      businessId: employee.businessId,
    });
  }, []);
  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  );
};

export default Dashboard;
