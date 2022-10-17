// import Button from '../../components/Button';
// import { IconNames } from '../../components/Icon';
// import SearchBar from '../SearchBar';
import Row from './Row';

const Table = (): JSX.Element => {
  return (
    <div className='rounded-sm overflow-hidden border border-gray-100 bg-white'>
      <table className="table-auto border-collapse w-full">
        <thead className="bg-gray-100">
          <Row data={['Employee name', 'Email', 'Role']} head/>
        </thead>
        <tbody>
          <Row data={['John Doe', 'j.doe@email.com', 'Admin']}/>
          <Row data={['John Doe', 'j.doe@email.com', 'Admin']}/>
          <Row data={['John Doe', 'j.doe@email.com', 'Admin']}/>
          <Row data={['John Doe', 'j.doe@email.com', 'Admin']}/>
          <Row data={['John Doe', 'j.doe@email.com', 'Admin']}/>
          <Row data={['John Doe', 'j.doe@email.com', 'Admin']}/>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
