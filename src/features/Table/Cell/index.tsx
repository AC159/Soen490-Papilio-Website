import classNames from 'classnames';

export declare interface CellInterface {
  value: React.ReactNode
  index: number
  head?: boolean
  center?: boolean
  short?: boolean
  onClick?: (data: number) => void
}

declare interface ICell {
  value: React.ReactNode
  className: string
  onClick?: () => void
}

const HeadCell = ({ value, ...args }: ICell): JSX.Element => (
    <th {...args}>
      {value !== '' && <span className="material-symbols-outlined align-middle text-sm -ml-3">swap_vert</span> }
      {value}
    </th>
);

const BodyCell = ({ value, ...args }: ICell): JSX.Element => <td {...args}>{value}</td>;

const Cell = ({ value, index, head = false, center = false, short = false, onClick = () => {} }: CellInterface): JSX.Element => {
  const classname = classNames(
    'text-left p-2 pt-2.5 pb-2.5',
    {
      'pt-3.5 pb-3.5 text-brand-blue-white align-middle': head,
      'text-center': center,
      'w-1.5 whitespace-nowrap': short,
      'cursor-pointer': head && value !== '',
    }
  );

  if (head) { return (<HeadCell className={classname} value={value} onClick={() => onClick(index)}/>); }
  return (<BodyCell className={classname} value={value}/>);
};

export default Cell;
