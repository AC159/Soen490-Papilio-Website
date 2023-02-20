import Button from '../../../../components/Button';
import * as constant from './constant';
import Table, {
  Activity,
  activityTableHeader,
} from '../Table';
import { useState } from 'react';
export declare interface DeleteFormInterface {
  activities: Activity[];
  onSubmit: (activityIds: string[]) => Promise<void>;
}

const DeleteForm = ({
  activities,
  onSubmit,
}: DeleteFormInterface): JSX.Element => {
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
      <Button
        text={constant.BUTTON_TEXT}
        onClick={async () => await onSubmit(activitiesIdsToDelete)}
      />
    </div>
  );
};

export default DeleteForm;
