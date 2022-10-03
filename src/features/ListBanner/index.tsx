import Container from '../../components/Container';
import TabList, { ITab } from '../TabList';

export declare interface ListBannerInterface {
  rhs?: React.ReactNode
  tabs?: ITab[]
}

const ListBanner = ({ tabs = [], rhs }: ListBannerInterface): JSX.Element => {
  return (
    <Container border="bottom" paddingClass="px-3 pt-1">
      <TabList tabs={tabs} horizontal/>
      {rhs !== undefined && (
        <div>{rhs}</div>
      )}
    </Container>
  );
};

export default ListBanner;
