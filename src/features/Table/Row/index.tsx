import Cell from '../Cell';

export declare interface RowInterface {
  data: string[];
  head?: boolean;
}
const Row = ({ data, head = false }: RowInterface): JSX.Element => {
  return (
    <tr className="border-gray-100 border-b last:border-b-0">
      {data.map((cell) => (
        <Cell key={cell} value={cell} head={head} />
      ))}
    </tr>
  );
};

export declare interface ClickableRowProps {
  data: string[];
  disabled: boolean;
  onClick: () => void;
}

export const ClickableRow = ({
  data,
  disabled,
  onClick,
}: ClickableRowProps): JSX.Element => {
  return (
    <tr className="border-gray-100 border-b last:border-b-0">
      <td>
        <input type="checkbox" onClick={onClick} disabled={disabled} />
      </td>
      {data.map((cell) => (
        <Cell key={cell} value={cell} />
      ))}
    </tr>
  );
};

export default Row;
