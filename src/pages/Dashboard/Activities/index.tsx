import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Table from '../Activities/ActivityTable';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';

const tabs: ITab[] = [
  { label: constant.ALL_ACTIVITY_LABEL },
];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className='border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white'>
    <span className="material-symbols-outlined">expand_more</span>
    <span className='flex-1'>User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const ActivityDashboard = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { businessId } = useParams();

  const onSubmit = async (data: IFormData): Promise<void> => {
    const reqData = {
      title: data.activityTitle,
      location: data.activityLocation,
      startTime: data.activityStart,
      endTime: data.activityEnd,
      description: data.activityDescription,
      costPerIndividual: +data.activityCostIndv,
      costPerGroup: +data.activityCostGroup,
      groupSize: +data.activityGroupSize,
      image: data.activityImage,
      businessId,
    };

    await fetch(`/api/business/addActivity/${businessId ?? ''}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activity: reqData }),
    });
  };

  return (
    <>
      <PageHeader
        header={constant.HEADER}
        subtitle={constant.SUBHEADER}
        rhs={(
          <>
            <SearchBar placeholder={constant.SEARCHBAR_PLACEHOLDER} onClick={() => {}} margin="right"/>
            <Box />
          </>
        )}
      />
      <ListBanner
        tabs={tabs}
        rhs={
          <Button
            text={constant.ADD_ACTIVITY_BUTTON}
            hasIcon={true}
            icon={IconNames.ADD}
            iconPosition='lhs'
            variant='outline'
            onClick={() => { setIsOpen(!isOpen); }}
            size='sm'
          />
        }
      />
      <div className='p-5'>
        {isOpen ? (<AddForm onSubmit={onSubmit} />) : (<Table />)}
      </div>
    </>
  );
};

export default ActivityDashboard;
