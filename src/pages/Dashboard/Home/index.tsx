import { registeredActivity, viewedActivity } from '../../../fakeData';
import { BarGraph } from '../../../features/BarGraph';
import PageHeader from '../../../features/PageHeader';

const HomeDashboard = (): JSX.Element => {
  return (
    <>
      <PageHeader header="Overview" />
      <div className=" h-screen">
        <div className="h-1/2 flex flex-row justify-between p-5 gap-5">
          <div className="w-1/2 bg-gray-50 p-2">
            <BarGraph data={viewedActivity} title="Activity viewed" />
          </div>
          <div className="w-1/2 bg-gray-50 p-2">
            <BarGraph data={registeredActivity} title="Activity registered" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDashboard;
