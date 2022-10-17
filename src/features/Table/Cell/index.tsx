import classNames from 'classnames';

export declare interface CellInterface {
  value: React.ReactNode
  head?: boolean
}

declare interface ICell {
  value: React.ReactNode
  className: string
}

const HeadCell = ({ value, ...args }: ICell): JSX.Element => <th {...args}>{value}</th>;
const BodyCell = ({ value, ...args }: ICell): JSX.Element => <td {...args}>{value}</td>;

const Cell = ({ value, head = false }: CellInterface): JSX.Element => {
  const classname = classNames(
    'text-left p-2 pt-2.5 pb-2.5',
    {
      'pt-3 pb-3': head,
    }
  );

  if (head) { return (<HeadCell className={classname} value={value}/>); }
  return (<BodyCell className={classname} value={value} />);
};

export default Cell;
