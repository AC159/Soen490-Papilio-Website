import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table, { Activity, activityTableHeader } from './Table';
import Button from '../../../components/Button';
import SearchBar from '../../../features/SearchBar';
import PageHeader from '../../../features/PageHeader';
import ListBanner from '../../../features/ListBanner';
import AddForm, { IFormData } from './AddForm';
import DeleteForm from './DeleteForm';
import EditForm from './EditForm';
import { ITab } from '../../../features/TabList';
import { IconNames } from '../../../components/Icon';
import * as constant from './constant';
import {
  addActivity,
  deleteActivities,
  getActivities,
  updateActivity,
} from '../../../api/apiLayer';
import { IActivityData, UpdateActivityData } from '../../../interfaces';

enum Section {
  Table,
  Add,
  Delete,
  Edit,
}

const tabs: ITab[] = [{ label: constant.ALL_ACTIVITY_LABEL }];

const Box = (): JSX.Element => (
  <div className="border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white">
    <span className="material-symbols-outlined">expand_more</span>
    <span className="flex-1">User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const formatDate = (date: string): string => {
  const parts = date.split('-');
  const result = new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0]),
  ).toString();
  return result;
};

const ActivityDashboard = (): JSX.Element => {
  const [refreshToken, setRefreshToken] = useState(true);
  const { businessId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentSection, setCurrentSection] = useState(Section.Table);
  const [currentActivity, setCurrentActivity] = useState<Activity>();

  const handleActivityCreation = async (data: IFormData): Promise<void> => {
    const reqData: IActivityData = {
      activity: {
        title: data.title,
        address: data.address,
        startTime: formatDate(data.startTime),
        endTime: formatDate(data.endTime),
        description: data.description,
        costPerIndividual: data.costPerIndividual,
        costPerGroup: data.costPerGroup,
        groupSize: data.groupSize,
      },
    };

    await addActivity(businessId ?? '', reqData)
      .then(() => {
        setCurrentSection(Section.Table);
      })
      .then(() => {
        setRefreshToken(!refreshToken);
      });
  };

  const handleActivityDeletion = async (
    activityIds: string[],
  ): Promise<void> => {
    await deleteActivities(activityIds, businessId ?? '').then(async () => {
      setActivities(
        activities.filter((activity) => !activityIds.includes(activity.id)),
      );
      setCurrentSection(Section.Table);
    });
  };

  const handleEditActivity = async (
    activityId: string,
    data: Activity,
  ): Promise<void> => {
    const reqData: UpdateActivityData = {
      update: {
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
    await updateActivity(activityId ?? '', reqData)
      .then(() => {
        setCurrentSection(Section.Table);
      })
      .then(() => {
        setRefreshToken(!refreshToken);
      });
  };

  const handleEdit = (activity: Activity): void => {
    setCurrentActivity(activity);
    if (currentSection !== Section.Edit) {
      setCurrentSection(Section.Edit);
    } else {
      setCurrentSection(Section.Table);
    }
    console.log(activity.title);
  };

  const ActionList = (): JSX.Element => {
    switch (currentSection) {
      case Section.Add:
      case Section.Delete:
      case Section.Edit:
        return (
          <Button
            text="Close"
            icon={IconNames.CLOSE}
            iconPosition="lhs"
            variant="outline"
            onClick={() => setCurrentSection(Section.Table)}
            size="sm"
            hasIcon
          />
        );
      default:
        return (
          <div className="flex space-x-2">
            <Button
              text={constant.ADD_ACTIVITY_BUTTON}
              hasIcon={true}
              icon={IconNames.ADD}
              iconPosition="lhs"
              variant="outline"
              onClick={() => {
                setCurrentSection(Section.Add);
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
                setCurrentSection(Section.Delete);
              }}
              size="sm"
            />
          </div>
        );
    }
  };

  useEffect(() => {
    void (async function getAllActivities() {
      await getActivities(businessId ?? '')
        // @ts-expect-error
        .then(setActivities)
        .catch((error) => {
          if (error?.cause !== 1) {
            console.error(error.message);
          }
        });
    })();
  }, [businessId, refreshToken]);

  let currentForm: JSX.Element = <></>;
  if (currentSection === Section.Delete) {
    currentForm = (
      <DeleteForm onSubmit={handleActivityDeletion} activities={activities} />
    );
  } else if (currentSection === Section.Add) {
    currentForm = <AddForm onSubmit={handleActivityCreation} />;
  } else if (currentSection === Section.Edit) {
    currentForm = (
      <EditForm
        onSubmit={handleEditActivity}
        activity={currentActivity as Activity}
      />
    );
  } else {
    currentForm = (
      <Table
        activities={activities}
        headerContent={activityTableHeader}
        onEdit={handleEdit}
      />
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
