import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Table, { Activity, activityTableHeader } from './Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import DeleteForm from './DeleteForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import {
  addActivity,
  deleteActivities,
  getActivities,
} from '../../../api/apiLayer';
import { IActivityData } from '../../../interfaces';

enum Section {
  Table,
  Add,
  Delete,
}

const tabs: ITab[] = [
  { label: constant.ALL_ACTIVITY_LABEL },
];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className="border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white">
    <span className="material-symbols-outlined">expand_more</span>
    <span className="flex-1">User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const ActivityDashboard = (): JSX.Element => {
  const { businessId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentSection, setCurrentSection] = useState(Section.Table);

  const handleActivityCreation = async (data: IFormData): Promise<void> => {
    const reqData: IActivityData = {
      activity: {
        title: data.title,
        address: data.address,
        startTime: data.startTime,
        endTime: data.endTime,
        description: data.description,
        costPerIndividual: data.costPerIndividual,
        costPerGroup: data.costPerGroup,
        groupSize: data.groupSize,
      },
    };

    await addActivity(businessId ?? '', reqData).then(() => {
      setCurrentSection(Section.Table);
    });
  };

  const handleActivityDeletion = async (
    activityIds: string[],
  ): Promise<void> => {
    await deleteActivities(activityIds, businessId ?? '').then(async () => {
      setActivities(
        activities.filter((activity) => !activityIds.includes(activity.id)),
      );
    });
  };

  const ActionList = (): JSX.Element => {
    return (
      <div className="flex space-x-2">
        <Button
          text={constant.ADD_ACTIVITY_BUTTON}
          hasIcon={true}
          icon={IconNames.ADD}
          iconPosition="lhs"
          variant="outline"
          onClick={() => {
            if (currentSection !== Section.Add) {
              setCurrentSection(Section.Add);
            } else {
              setCurrentSection(Section.Table);
            }
          }}
          size="sm"
        />
        <Button
          text={constant.DELETE_ACTIVITY_BUTTON}
          hasIcon={true}
          icon={IconNames.DELETE}
          iconPosition="lhs"
          variant="outline"
          onClick={() => {
            if (currentSection !== Section.Delete) {
              setCurrentSection(Section.Delete);
            } else {
              setCurrentSection(Section.Table);
            }
          }}
          size="sm"
        />
      </div>
    );
  };

  useEffect(() => {
    void (async function () {
      await getActivities(businessId ?? '')
        .then(async (res) => {
          // @ts-expect-error
          const { activities } = res;
          // @ts-expect-error
          const activityArray = activities.map((activity) => ({
            id: activity.id,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            title: activity.title,
            startTime: activity.startTime?.substring(0, 10),
            endTime: activity.endTime?.substring(0, 10),
            address: activity.address,
          }));
          setActivities(activityArray);
        })
        .catch((error) => {
          if (error?.cause !== 1) {
            console.error(error.message);
          }
        });
    })();
  }, [businessId]);

  let currentForm = null;
  if (currentSection === Section.Delete) {
    currentForm = (
      <DeleteForm onSubmit={handleActivityDeletion} activities={activities} />
    );
  } else if (currentSection === Section.Add) {
    currentForm = <AddForm onSubmit={handleActivityCreation} />;
  } else {
    currentForm = (
      <Table activities={activities} headerContent={activityTableHeader} />
    );
  }

  return (
    <>
      <PageHeader
        header={constant.HEADER}
        subtitle={constant.SUBHEADER}
        rhs={
          <>
            <SearchBar
              placeholder={constant.SEARCHBAR_PLACEHOLDER}
              onClick={() => {}}
              margin="right"
            />
            <Box />
          </>
        }
      />
      <ListBanner tabs={tabs} rhs={<ActionList />} />
      <div className="p-3">{currentForm}</div>
    </>
  );
};

export default ActivityDashboard;
