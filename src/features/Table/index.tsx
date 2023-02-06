import { useCallback } from 'react';
import Row, { ClickableRow } from './Row';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface IProps {
  employees: Employee[];
  headerContent: string[];
  onSelect?: (employee: Employee) => void;
}

export const employeeTableHeader = ['Employee name', 'Email', 'Role'];

const Table = ({ employees, headerContent, onSelect }: IProps): JSX.Element => {
  const employeeRows = employees.map((employee) => {
    const data = [employee.name, employee.email, employee.role];
    if (onSelect === undefined) {
      return <Row key={`employee-${employee.id}`} data={data} />;
    }

    const handleOnClick = useCallback(
      (employee: Employee): void => {
        onSelect(employee);
      },
      [onSelect],
    );

    return (
      <ClickableRow
        key={`employee-${employee.id}`}
        data={data}
        onClick={() => handleOnClick(employee)}
      />
    );
  });

  return (
    <div className="rounded-sm overflow-hidden border border-gray-100 bg-white">
      <table className="table-auto border-collapse w-full">
        <thead className="bg-gray-100">
          <Row data={headerContent} head />
        </thead>
        <tbody>{employeeRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
