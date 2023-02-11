import Button from '../../../../components/Button';
import * as constant from './constant';
import Table, {
  Employee,
  employeeTableHeader,
} from '../../../../features/Table';
import { useCallback, useState } from 'react';
import { useAuth } from '../../../../hooks/useEmployee';
import { Portal } from '../../../../utils/portal';
export declare interface DeleteFormInterface {
  employees: Employee[];
  onSubmit: (employeeIds: string[]) => Promise<void>;
}

const DeleteForm = ({
  employees,
  onSubmit,
}: DeleteFormInterface): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { employee: admin } = useAuth();
  const [employeeIdsToDelete, setEmployeeIdsToDelete] = useState<string[]>([]);

  const handleToggleEmployeeToDelete = useCallback(
    (employee: Employee): void => {
      const employeeId = employee.id;
      if (employeeIdsToDelete.includes(employeeId)) {
        setEmployeeIdsToDelete(
          employeeIdsToDelete.filter((id) => employeeId !== id),
        );
      } else {
        setEmployeeIdsToDelete([...employeeIdsToDelete, employeeId]);
      }
    },
    [setEmployeeIdsToDelete, employeeIdsToDelete],
  );

  const openSubmissionModal = useCallback(
    (): void => setIsOpen(true),
    [setIsOpen],
  );
  const closeSubmissionModal = useCallback(
    (): void => setIsOpen(false),
    [setIsOpen],
  );
  const handleDelete = useCallback(async (): Promise<void> => {
    await onSubmit(employeeIdsToDelete);
    setIsOpen(false);
  }, [onSubmit, setIsOpen, employeeIdsToDelete]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">
        {constant.FORM_HEADLINE}
      </h2>
      <br></br>
      <Table
        rowsData={employees}
        headerContent={employeeTableHeader}
        onSelect={handleToggleEmployeeToDelete}
        disabledRowId={admin.firebaseId}
      />
      <Button text={constant.BUTTON_TEXT} onClick={openSubmissionModal} />
      {isOpen && (
        <Portal>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 shadow-lg w-3/12 rounded-xl p-5 text-center border-2 border-red-400">
            <span>Are you sure you want to delete these employees?</span>
            <div className="flex flex-row space-x-2 justify-end mt-5">
              <Button
                text="Cancel"
                onClick={closeSubmissionModal}
                variant="outline-dark"
              />
              <Button text="Delete" onClick={handleDelete} />
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default DeleteForm;
