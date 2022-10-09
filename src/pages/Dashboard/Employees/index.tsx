import DashboardContainer from '../../../features/DashboardContainer';
import { ITab } from '../../../features/TabList';

const tabs: ITab[] = [
  { label: 'All employees' },
  { label: 'Admin' },
  { label: 'Normal' },
];

const EmployeeDashboard = (): JSX.Element => {
  return (
    <DashboardContainer
      header='Employees'
      subtitle='Manage, control and give access'
      tabs={tabs}
    >
      <div></div>
    </DashboardContainer>
  );
};

export default EmployeeDashboard;
