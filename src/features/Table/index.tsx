import { useCallback, useEffect, useState } from 'react';
import Row, { ClickableRow } from './Row';
import { RowProps } from '../../interfaces';

export interface Employee extends RowProps {
  name: string;
  email: string;
  role: string;
}

interface IProps<T> {
  rowsData: RowProps[];
  headerContent: string[];
  disabledRowId?: string;
  onSelect?: (element: T) => void;
}

export const employeeTableHeader = ['Employee name', 'Email', 'Role'];
export const activityTableHeader = [
  'Activity Title',
  'Start Date',
  'End Date',
  'Location',
  'Status',
];

const Table = <T extends RowProps>({
  rowsData,
  headerContent,
  disabledRowId,
  onSelect,
}: IProps<T>): JSX.Element => {
  const [buffer, setBuffer] = useState<string[]>([]);

  useEffect(() => {
    if (onSelect !== undefined) {
      setBuffer(['']);
    } else {
      setBuffer([]);
    }
  }, [onSelect]);

  const handleOnClick = useCallback(
    // @ts-expect-error
    (el: RowProps): void => onSelect(el),
    [onSelect],
  );

  const rows = rowsData.map((row) => {
    const data = Object.entries(row)
      .filter(([key, _]) => key !== 'id')
      .reduce((acc: string[], [_, value]) => [...acc, value], []);

    if (onSelect === undefined) {
      return <Row key={`row-${row.id}`} data={data} />;
    }

    return (
      <ClickableRow
        key={`row-${row.id}`}
        data={data}
        onClick={() => handleOnClick(row)}
        disabled={disabledRowId === row.id}
      />
    );
  });

  return (
    <div className="rounded-sm overflow-hidden border border-gray-100 bg-white">
      <table className="table-auto border-collapse w-full">
        <thead className="bg-gray-100">
          <Row data={[...buffer, ...headerContent]} head />
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
