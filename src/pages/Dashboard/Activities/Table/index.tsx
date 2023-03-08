import { useCallback, useEffect, useState } from 'react';
import Row, { ClickableRow, EditableRow } from './Row';

export interface Activity {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  address: string;
  description: string;
  costPerIndividual: number;
  costPerGroup: number;
  groupSize: number;
}

interface IProps {
  activities: Activity[];
  headerContent: string[];
  disabledRowId?: string;
  onSelect?: (activity: Activity) => void;
  onEdit?: (activity: Activity) => void;
}

export const activityTableHeader = ['Activity Title', 'Start Date (yyyy-mm-dd)', 'End Date (yyyy-mm-dd)', 'Location', ''];

const Table = ({
  activities,
  headerContent,
  disabledRowId,
  onSelect,
  onEdit,
}: IProps): JSX.Element => {
  const [buffer, setBuffer] = useState<string[]>([]);

  useEffect(() => {
    if (onSelect !== undefined) {
      setBuffer(['']);
    } else {
      setBuffer([]);
    }
  }, [onSelect, onEdit]);

  const handleOnClick = useCallback(
    // @ts-expect-error
    (activity: Activity): void => onSelect(activity),
    [onSelect],
  );

  const handleOnClickEdit = useCallback(
    // @ts-expect-error
    (activity: Activity): void => onEdit(activity),
    [onEdit],
  );

  const activityRows = activities.map((activity) => {
    const data = [activity.title, activity.startTime, activity.endTime, activity.address];
    if (onSelect === undefined) {
      return (
        <EditableRow
          key={`activity-${activity.id}`}
          data={data}
          onClickEdit={() => handleOnClickEdit(activity)}
        />
      );
    }

    return (
      <ClickableRow
        key={`activity-${activity.id}`}
        data={data}
        onClick={() => handleOnClick(activity)}
        disabled={disabledRowId === activity.id}
      />
    );
  });

  return (
    <div className="rounded-sm overflow-hidden border border-gray-100 bg-white">
      <table className="table-auto border-collapse w-full">
        <thead className="bg-gray-100">
          <Row data={[...buffer, ...headerContent]} head />
        </thead>
        <tbody>{activityRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
