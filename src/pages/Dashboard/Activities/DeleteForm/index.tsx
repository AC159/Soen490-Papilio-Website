import { useState, useCallback } from 'react';
import Button from '../../../../components/Button';
import * as constant from './constant';
import Table, { Activity, activityTableHeader } from '../Table';
import { Portal } from '../../../../utils/portal';

export declare interface DeleteFormInterface {
  activities: Activity[];
  onSubmit: (activityIds: string[]) => Promise<void>;
}

const DeleteForm = ({
  activities,
  onSubmit,
}: DeleteFormInterface): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [activitiesIdsToDelete, setActivitiesIdsToDelete] = useState<string[]>(
    [],
  );

  const handleToggleActivitiesToDelete = (activity: Activity): void => {
    const activityId = activity.id;
    if (activitiesIdsToDelete.includes(activityId)) {
      setActivitiesIdsToDelete(
        activitiesIdsToDelete.filter((id) => activityId !== id),
      );
    } else {
      setActivitiesIdsToDelete([...activitiesIdsToDelete, activityId]);
    }
  };

  const openSubmissionModal = useCallback(
    (): void => setIsOpen(true),
    [setIsOpen],
  );
  const closeSubmissionModal = useCallback(
    (): void => setIsOpen(false),
    [setIsOpen],
  );
  const handleDelete = useCallback(async (): Promise<void> => {
    await onSubmit(activitiesIdsToDelete);
    setIsOpen(false);
  }, [onSubmit, setIsOpen, activitiesIdsToDelete]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">
        {constant.FORM_HEADLINE}
      </h2>
      <br></br>
      <Table
        activities={activities}
        headerContent={activityTableHeader}
        onSelect={handleToggleActivitiesToDelete}
      />
      <Button text={constant.BUTTON_TEXT} onClick={openSubmissionModal} />
      {isOpen && (
        <Portal>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 shadow-lg w-3/12 rounded-xl p-5 text-center border-2 border-red-400">
            <span>Are you sure you want to delete these employees?</span>
            <div className="flex flex-row space-x-2 justify-center mt-5">
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
