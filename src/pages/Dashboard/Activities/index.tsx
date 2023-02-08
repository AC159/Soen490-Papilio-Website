import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import Table from '../Activities/ActivityTable';
import Table, {
  ActivityProps,
  activityTableHeader,
} from '../../../features/Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import { addActivity, getActivites } from '../../../api/apiLayer';
import { IActivityData } from '../../../interfaces';
import { formatDate } from '../../../utils';

const tabs: ITab[] = [{ label: constant.ALL_ACTIVITY_LABEL }];

// TODO: --- THIS IS A PLACEHOLDER --- Replace with real component.
const Box = (): JSX.Element => (
  <div className="border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white">
    <span className="material-symbols-outlined">expand_more</span>
    <span className="flex-1">User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const ActivityDashboard = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [activities, setActivities] = useState<ActivityProps[]>([]);
  const { businessId } = useParams();

  const onSubmit = async (data: IFormData): Promise<void> => {
    const reqData: IActivityData = {
      activity: {
        title: data.activityTitle,
        description: data.activityDescription,
        costPerIndividual: parseFloat(data.activityCostIndv),
        costPerGroup: parseFloat(data.activityCostGroup),
        groupSize: parseFloat(data.activityGroupSize),
        startTime: data.activityStart,
        address: data.activityLocation,
      },
      // image: data.activityImage,  // TODO: Add image information
    };
    await addActivity(businessId ?? '', reqData).then(() => setIsOpen(false));
  };

  useEffect(() => {
    void (async function getAllEmployees() {
      await getActivites(businessId ?? '')
        .then(async (res) => {
          const { activities } = res;
          const activitiesArray = activities.map((activity) => ({
            id: activity.id?.toString() ?? '',
            title: activity.title,
            startTime: formatDate(activity.startTime),
            endTime: activity.endTime ?? '',
            address: activity.address,
            status: 'inactive',
          }));
          setActivities(activitiesArray);
        })
        .catch((error) => {
          if (error?.cause !== 1) {
            console.error(error.message);
          }
        });
    })();
  }, [businessId, isOpen]);

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
      <ListBanner
        tabs={tabs}
        rhs={
          <Button
            text={isOpen ? 'Close' : constant.ADD_ACTIVITY_BUTTON}
            hasIcon={true}
            icon={isOpen ? IconNames.CLOSE : IconNames.ADD}
            iconPosition="lhs"
            variant="outline"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            size="sm"
          />
        }
      />
      <div className="p-5">
        {isOpen ? (
          <AddForm onSubmit={onSubmit} />
        ) : (
          <Table rowsData={activities} headerContent={activityTableHeader} />
        )}
      </div>
    </>
  );
};

export default ActivityDashboard;
