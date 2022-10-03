import Container from "../../components/Container";

export declare interface PageHeaderInterface {
  header: string;
  subtitle?: string;
}

const PageHeader = ({header, subtitle}: PageHeaderInterface) => {
  return (
    <Container border='bottom' paddingClass="px-3 pb-2 pt-3">
      <div>
        <h1 className="m-0 text-xl -mt-1">{header}</h1>
        {subtitle && <h5 className="text-sm">{subtitle}</h5>}
      </div>
    </Container>
  );
};

export default PageHeader;