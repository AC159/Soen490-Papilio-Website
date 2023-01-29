import { Outlet } from 'react-router-dom';

import DashboardContainer from '../../features/DashboardContainer';

const Dashboard = (): JSX.Element => {
  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  );
};

export default Dashboard;
