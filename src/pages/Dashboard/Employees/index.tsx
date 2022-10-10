import Table from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';

const tabs: ITab[] = [
  { label: 'All employees' },
  { label: 'Admin' },
  { label: 'Normal' },
];

const Box = (): JSX.Element => (
  <div className='border rounded-sm p-8 pt-1.5 pb-1.5 border-gray-300'>User</div>
);

const EmployeeDashboard = (): JSX.Element => {
  return (
    <>
      <PageHeader
        header="Employees"
        subtitle='Manage, control and give access'
        rhs={(
          <>
            <SearchBar placeholder='Search employees...' onClick={() => {}} margin="right"/>
            <Box />
          </>
        )}
      />
      <ListBanner tabs={tabs} rhs={
        <Button
        text='Add employee'
        hasIcon={true}
        icon={IconNames.ADD}
        iconPosition='lhs'
        variant='outline'
        onClick={() => {}}
        size='sm'
      />
      }/>
      <div className='p-3'>
        {/* <div className="flex justify-between items-center mb-4 mt-1">

        </div> */}
        <Table />
      </div>
    </>
  );
};

export default EmployeeDashboard;
