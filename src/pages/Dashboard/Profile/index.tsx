import { useState } from 'react';

import PageHeader from '../../../features/PageHeader';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { IconNames } from '../../../components/Icon';

const ProfileInformation: { [key: string]: string } = {
  'Business name': 'My Awesome Billion Dollar Business ',
  Address: '1234 Rich St',
  '': 'App. 2',
  'Postal Code': 'G6T 3G6',
  City: 'Montreal',
  Province: 'QC',
  Country: 'Canada',
};

const ProfileDashboard = (): JSX.Element => {
  return (
    <div className='flex flex-col h-full'>
      <PageHeader
        header='Business profile'
      />
      <div className='m-4 flex-1 p-4'>
        {Object.entries(ProfileInformation).map((entry) => {
          const [isEditing, setIsEditing] = useState(false);

          return (
          <div key={entry[0]} className='flex flex-row items-center mb-2'>
            <p className=' font-bold mr-4 w-1/4 text-right'>{entry[0]}</p>
            {isEditing
              ? (
                <div className='border rounded-sm border-brand-blue-dark bg-brand-blue-light p-4 flex-1 group flex flex-row items-center justify-between'>
                  <Input
                    name={entry[0]}
                    value={entry[1]}
                    placeholder=''
                    variant='ghost'
                    onChange={() => {}}
                    />
                  <Button
                    variant='ghost'
                    icon={IconNames.SAVE}
                    onClick={() => { setIsEditing(false); }}
                    hasIcon
                  />
                </div>
                )
              : (
                <div className='border rounded-sm p-4 flex-1 group flex flex-row items-center justify-between' data-testid='field' >
                  <span>{entry[1]}</span>
                  <div className='text-white group-hover:text-black'>
                    <Button
                      variant='ghost'
                      icon={IconNames.EDIT_SQUARE}
                      onClick={() => { setIsEditing(true); }}
                      hasIcon
                      />
                  </div>
                </div>
                )
            }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileDashboard;
