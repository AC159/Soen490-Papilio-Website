import SideMenu from '../SideMenu';

export declare interface IDashboardContainer {
  children: React.ReactNode;
}

const DashboardContainer = ({ children }: IDashboardContainer): JSX.Element => {
  return (
    <div className="flex flex-row w-screen h-screen">
      <SideMenu />
      <div className="flex-1 pl-48">{children}</div>
    </div>
  );
};

export default DashboardContainer;
