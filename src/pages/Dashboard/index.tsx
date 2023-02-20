import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardContainer from '../../features/DashboardContainer';
import { useAuth } from '../../hooks/useEmployee';

const Dashboard = (): JSX.Element => {
  const { load } = useAuth();
  console.log(useAuth());
  useEffect(() => {
    load();
  }, []);

  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  );
};

export default Dashboard;
