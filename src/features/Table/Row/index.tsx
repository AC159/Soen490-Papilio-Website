import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import Cell from '../Cell';

export interface RowAction {
  label: string;
  onClick: (rowId: string) => void;
}

export declare interface RowInterface {
  data: string[];
  rowId?: string;
  rowActions?: RowAction[];
  head?: boolean;
}

const Row = ({ data, rowActions, rowId = '', head = false }: RowInterface): JSX.Element => {
  const haveRowId = rowId !== '';
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: RowAction): void => {
    action.onClick(rowId);
    handleClose();
  };

  return (
    <tr className="border-gray-100 border-b last:border-b-0">
      {data.map((cell) => (
        <Cell key={cell} value={cell} head={head} />
      ))}
      {rowActions && rowActions.length > 0 && haveRowId ? (
        <td>
          <div style={{ display: 'flex' }}>
            <Button onClick={handleClick}>
              Actions
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {rowActions.map((rowAction, i) => (
                <MenuItem key={`action-${i}`} onClick={() => handleActionClick(rowAction)}>
                  {rowAction.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </td>
      ) : null}
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
    <tr className="border-orange-100 border-b last:border-b-0">
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
