import Container from '../../components/Container';

export declare interface PageHeaderInterface {
  header: string
  subtitle?: string
  rhs?: React.ReactNode
}

const PageHeader = ({ header, subtitle, rhs }: PageHeaderInterface): JSX.Element => {
  return (
    <Container border='bottom' paddingClass="px-3 pb-2 pt-3">
      <div>
        <h1 className="m-0 text-xl -mt-1">{header}</h1>
        {subtitle !== undefined && <h5 className="text-sm">{subtitle}</h5>}
      </div>
      <div className='flex justify-end items-center'>
        {rhs}
      </div>
    </Container>
  );
};

export default PageHeader;
