import Button from '../../../../components/Button';
import * as constant from './constant';
import Table, {
  Employee,
  employeeTableHeader,
} from '../../../../features/Table';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useEmployee';
export declare interface DeleteFormInterface {
  employees: Employee[];
  onSubmit: (employeeIds: string[]) => Promise<void>;
}

const DeleteForm = ({
  employees,
  onSubmit,
}: DeleteFormInterface): JSX.Element => {
  const { employee: admin } = useAuth();
  const [employeesIdsToDelete, setEmployeesIdsToDelete] = useState<string[]>(
    [],
  );

  const handleToggleEmployeeToDelete = (employee: Employee): void => {
    const employeeId = employee.id;
    if (employeesIdsToDelete.includes(employeeId)) {
      setEmployeesIdsToDelete(
        employeesIdsToDelete.filter((id) => employeeId !== id),
      );
    } else {
      setEmployeesIdsToDelete([...employeesIdsToDelete, employeeId]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">
        {constant.FORM_HEADLINE}
      </h2>
      <br></br>
      <Table
        employees={employees}
        headerContent={employeeTableHeader}
        onSelect={handleToggleEmployeeToDelete}
        disabledRowId={admin.firebaseId}
      />
      <Button
        text={constant.BUTTON_TEXT}
        onClick={async () => await onSubmit(employeesIdsToDelete)}
      />
    </div>
  );
};

export default DeleteForm;
