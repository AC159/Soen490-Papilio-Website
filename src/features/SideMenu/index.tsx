import Logo from '../../components/Logo';
import TabList, { ITab } from '../TabList';

const tabs: ITab[] = [
  {
    label: 'Home',
    icon: 'home',
    path: '',
  },
  {
    label: 'Event manager',
    icon: 'event',
    path: 'events',
  },
  {
    label: 'Ad center',
    icon: 'ad',
    path: 'ads',
  },
  {
    label: 'Employees',
    icon: 'employee',
    path: 'employees',
  },
];

const SideMenu = (): JSX.Element => {
  return (
    <div className="w-48 border-r-2 flex flex-col h-screen">
      <div className="pt-4 pb-8 px-3">
        <Logo size="md" hasText/>
      </div>
      <TabList tabs={tabs} type='link' />
      <span className="flex-1"/>
      <div onClick={() => {}} className="flex px-3.5 py-3 border-t-2 bg-gray-200 active:bg-gray-400 cursor-pointer">
        <span className="material-symbols-outlined text-base mr-3">
          logout
        </span>
        Logout
      </div>
    </div>
  );
};

export default SideMenu;
