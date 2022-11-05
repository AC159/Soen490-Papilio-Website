import { useState } from 'react';

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

const Row = ({ data, head = false, id, onClick }: RowInterface): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);
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
            : (<PopoverButton id={id} onClick={() => { console.log('clicked'); }} />)
        }
        head={head}
        index={-2}
        short
      />
    </tr>
  );
};

export default Row;
