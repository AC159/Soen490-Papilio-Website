import { useEffect, useState } from 'react';
import { registeredActivity, viewedActivity } from '../../../fakeData';
import { BarGraph } from '../../../features/BarGraph';
import PageHeader from '../../../features/PageHeader';
import { GraphDataProps } from '../../../interfaces';

const HomeDashboard = (): JSX.Element => {
  const [currentActivity, setActivity] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [viewedActivities, setViewedActivities] =
    useState<GraphDataProps[]>(viewedActivity);
  const [registeredActivities, setRegisteredActivities] =
    useState<GraphDataProps[]>(registeredActivity);

  useEffect(() => {
    setActivities(viewedActivity.map((activity) => activity.label));
  }, []);

  useEffect(() => {
    if (currentActivity !== '') {
      setViewedActivities(
        viewedActivity.filter((activity) => activity.label === currentActivity),
      );
      setRegisteredActivities(
        registeredActivity.filter(
          (activity) => activity.label === currentActivity,
        ),
      );
    } else {
      setViewedActivities(viewedActivity);
      setRegisteredActivities(registeredActivity);
    }
  }, [currentActivity]);

  const handleActivityChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => setActivity(e.target.value);

  const createGraphTitle = (action: string, activity: string): string => {
    const title = activity !== '' ? activity : 'all activities';
    return `Activity ${action} for ${title}`;
  };

  const createSubtitle = (activity: string): string => {
    if (activity === '') {
      return 'All activities';
    }
    return activity[0].toUpperCase() + activity.slice(1);
  };

  return (
    <>
      <PageHeader
        header="Overview"
        subtitle={createSubtitle(currentActivity)}
        rhs={
          <div className="flex justify-end mb-1 pr-2">
            <div className="relative w-min">
              <select
                className="border border-gray-300 block leading-tight rounded-none appearance-none pl-3 pr-7 py-1.5 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                value={currentActivity}
                onChange={handleActivityChange}
              >
                <option value="">All activities</option>
                {activities.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        }
      />
      <div className="h-1/2">
        <div className="h-full flex flex-row justify-between p-5 gap-5">
          <div className="w-1/2 bg-gray-50 p-2">
            <BarGraph
              data={viewedActivities}
              title={createGraphTitle('viewed', currentActivity)}
            />
          </div>
          <div className="w-1/2 bg-gray-50 p-2">
            <BarGraph
              data={registeredActivities}
              title={createGraphTitle('registered', currentActivity)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
