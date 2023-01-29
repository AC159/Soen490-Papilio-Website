import Ad from '../../../features/Ad';
import PageHeader from '../../../features/PageHeader';
import * as constant from './contant';

const Box = (): JSX.Element => (
  <div className='border rounded-sm w-36 p-1.5 border-gray-300 flex flex-row items-center bg-gray-300 text-white'>
    <span className="material-symbols-outlined">expand_more</span>
    <span className='flex-1'>User</span>
    <span className="material-symbols-outlined">account_box</span>
  </div>
);

const AdsDashboard = (): JSX.Element => {
  return (
    <div className='flex flex-col h-full'>
      <PageHeader
        header={constant.HEADER}
        subtitle={constant.SUBHEADER}
        rhs={(
          <>
            <Box />
          </>
        )}
      />
      <Ad/>
    </div>
  );
};

export default AdsDashboard;
