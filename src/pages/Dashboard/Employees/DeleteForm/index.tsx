import Button from '../../../../components/Button';
import * as constant from './constant';
import Table, { Employee } from '../../../../features/Table';
import { useState } from 'react';
export declare interface DeleteFormInterface {
  employees: Employee[]
  onSubmit: (employeeIds: number[]) => void
}

const DeleteForm = ({ employees, onSubmit }: DeleteFormInterface): JSX.Element => {
  //   const [formData, onValueChange, submit] = useFormData<IFormData>({ initialState, onSubmit });

  const [employeesIdsToDelete, setEmployeesIdsToDelete] = useState<number[]>([]);

  const handleToggleEmployeeToDelete = (employee: Employee): void => {
    const employeeId = Number(employee.id);
    if (employeesIdsToDelete.includes(employeeId)) {
      setEmployeesIdsToDelete(employeesIdsToDelete.filter(id => employeeId !== id));
    } else {
      setEmployeesIdsToDelete([...employeesIdsToDelete, employeeId]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">{constant.FORM_HEADLINE}</h2>
      <br></br>
      <Table employees={employees} onSelect={handleToggleEmployeeToDelete} />

      {/* // TODO: Give choices to employee */}
      <Button text={constant.BUTTON_TEXT} onClick={() => onSubmit(employeesIdsToDelete)} />
    </div>
  );
};

export default DeleteForm;
