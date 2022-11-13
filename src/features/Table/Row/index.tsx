import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Cell from '../Cell';
import PopoverButton from '../PopoverButton';

export declare interface RowInterface {
  id: string
  data: CellData[]
  head?: boolean
  onClick?: (data: number) => void
}

export declare interface CellData {
  value: string
  center?: boolean
}

// TODO: Activate flag when endpoint is created
const IS_DELETE_FEATURE_FLAG_ACTIVATED = false;
// TODO: Activate flag when endpoint is created
const IS_UPDATE_FEATURE_FLAG_ACTIVATED = false;

const Row = ({ data, head = false, id, onClick }: RowInterface): JSX.Element => {
  const { businesId } = useParams();
  const [isSelected, setIsSelected] = useState(false);

  const onDelete = async (): Promise<void> => {
    if (IS_DELETE_FEATURE_FLAG_ACTIVATED) {
      await fetch(`/api/business/get/${businesId ?? ''}/employees/${id}`, {
        method: 'DELETE',
      }).then(res => {
        if (res.status === 200) alert(`User ${id} has been deleted`);
      });
    } else {
      console.log(`${id} is being delete from database`);
    }
  };
  const onUpdate = async (data: any): Promise<void> => {
    if (IS_UPDATE_FEATURE_FLAG_ACTIVATED) {
      await fetch(`/api/business/get/${businesId ?? ''}/employees/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }).then(res => {
        if (res.status === 200) alert(`User ${id} has been successfully updated`);
      });
    } else {
      console.log(`${id} is being updated in the database`);
    }
  };

  return (
    <tr className='border-b border-brand-blue-dark last:border-b-0 cursor-pointer' onClick={() => setIsSelected(prev => !prev)}>
      <Cell
        head={head}
        index={-1}
        value={
          head
            ? ''
            : (
            <span className="material-symbols-outlined align-middle">
              {isSelected
                ? 'check_box'
                : 'check_box_outline_blank'}
            </span>)
        }
        short
      />
      {data.map(({ value, center }, index) => (
        <Cell key={`${value}-${index}`} index={index} value={value} head={head} center={center} onClick={onClick} />
      ))}
      <Cell
        value={
          head
            ? ''
            : (
                <PopoverButton
                  id={id}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              )
        }
        head={head}
        index={-2}
        short
      />
    </tr>
  );
};

export default Row;
