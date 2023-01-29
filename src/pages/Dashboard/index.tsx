import { Outlet } from 'react-router-dom';

import DashboardContainer from '../../features/DashboardContainer';
import { useAuth } from '../../hooks/useEmployee';

const Dashboard = (): JSX.Element => {
  console.log(useAuth().employee);
  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  );
};

export default Dashboard;
