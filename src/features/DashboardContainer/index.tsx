import ListBanner from '../ListBanner';
import PageHeader from '../PageHeader';
import SideMenu from '../SideMenu';
import { ITab } from '../TabList';

export declare interface IDashboardContainer {
  children: React.ReactNode
  header: string
  subtitle?: string
  tabs?: ITab[]
  rhs?: React.ReactNode
}

const DashboardContainer = ({ header, subtitle, tabs, children }: IDashboardContainer): JSX.Element => {
  return (
    <div className="flex flex-row w-full">
      <SideMenu />
      <div className="flex-1">
        <PageHeader header={header} subtitle={subtitle}/>
        {(tabs != null) && <ListBanner tabs={tabs}/>}
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;
