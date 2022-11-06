import Row from '../../../../features/Table/Row';

const Table = (): JSX.Element => {
  return (
    <div className='rounded-sm overflow-hidden border border-gray-100 bg-white'>
      <table className="table-auto border-collapse w-full">
        <thead className="bg-gray-100">
          <Row data={['Activity Title', 'Start Date', 'End Date', 'Location', 'Status']} head/>
        </thead>
        <tbody>
          {/* TODO: Change from hardcoded information to fetching information from backend */}
          <Row data={['Laurentian Lanes Bowling', '01-10-2022', '01-11-2022', '222 Mnt de Liesse, Saint-Laurent, QC H4T 1N8', 'Expired']}/>
          <Row data={['Activity #2', '01-11-2022', '01-12-2022', '123 Guy Street, Montreal, QC', 'Active']}/>
          <Row data={['Activity #3', '01-01-2023', '01-02-2023', '123 Guy Street, Montreal, QC', 'Inactive']}/>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
