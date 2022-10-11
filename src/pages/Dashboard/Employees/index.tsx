import { useState } from 'react';

import Table from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm from './AddForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';

const tabs: ITab[] = [
  { label: 'All employees' },
  { label: 'Admin' },
  { label: 'Normal' },
];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className='border rounded-sm p-8 pt-1.5 pb-1.5 border-gray-300'>User</div>
);

const EmployeeDashboard = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

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
        onClick={() => { setIsOpen(!isOpen); }}
        size='sm'
      />
      }/>
      <div className='p-3'>
        {isOpen ? (<AddForm onSubmit={() => {}}/>) : (<Table />)}
      </div>
    </>
  );
};

export default EmployeeDashboard;
