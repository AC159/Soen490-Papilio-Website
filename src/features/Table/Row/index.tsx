import Cell from '../Cell';

export declare interface RowInterface {
  data: string[];
  head?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}
const Row = ({
  data,
  head = false,
  isClickable = false,
  onClick,
}: RowInterface): JSX.Element => {
  const handleOnClick = (): void => {
    if (onClick != null) {
      onClick();
    }
  };

  return (
    <>
      <tr className="border-gray-100 border-b last:border-b-0">
        <td>
          {isClickable ? (
            <input type="checkbox" onClick={handleOnClick} />
          ) : null}
        </td>
        {data.map((cell) => (
          <Cell key={cell} value={cell} head={head} />
        ))}
      </tr>
    </>
  );
};

export default Row;
