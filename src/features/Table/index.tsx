// import Button from '../../components/Button';
// import { IconNames } from '../../components/Icon';
// import SearchBar from '../SearchBar';
import Row from './Row';

export interface TableEmployee {
  id: string | number
  name: string
  email: string
  role: string
};

interface IProps {
  employees: TableEmployee[]
  onSelect?: (employee: TableEmployee) => void
}

const Table = ({
  employees,
  onSelect,
}: IProps): JSX.Element => {
  const isClickable = !(onSelect == null);

  const handleOnClick = (employee: TableEmployee): void => {
    if (onSelect != null) {
      onSelect(employee);
    }
  };

  const employeeRows = employees.map((employee) => {
    return (
      <Row key={`employee-${employee.id}`} data={[employee.name, employee.email, employee.role]} onClick={() => handleOnClick(employee)} isClickable={isClickable} />
    );
  });

  return (
    <div className='rounded-sm overflow-hidden border border-gray-100 bg-white'>
      <table className="table-auto border-collapse w-full">
        <thead className="bg-gray-100">
          <Row data={['Employee name', 'Email', 'Role']} />
        </thead>
        <tbody>
          {employeeRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
