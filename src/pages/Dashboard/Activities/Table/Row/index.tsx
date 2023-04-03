import Button from '../../../../../components/Button';
import { IconNames } from '../../../../../components/Icon';
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

export declare interface EditableRowInterface {
  data: string[];
  head?: boolean;
  onClickEdit: () => void;
}

export const EditableRow = ({
  data,
  head = false,
  onClickEdit,
}: EditableRowInterface): JSX.Element => {
  return (
    <tr className="border-gray-100 border-b last:border-b-0">
      {data.map((cell) => (
        <Cell key={cell} value={cell} head={head} />
      ))}
      <td>
        <Button
          variant="ghost"
          icon={IconNames.EDIT_SQUARE}
          onClick={onClickEdit}
          hasIcon
        />
      </td>
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
