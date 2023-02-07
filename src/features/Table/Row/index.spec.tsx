import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import Row, { ClickableRow } from '.';
import Cell from '../Cell';

jest.mock('../Cell', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const oneCell = Array.from('1');
const tenCells = Array.from('0123456789');

const renderRow = (row: ReactNode): JSX.Element => (
  <table>
    <tbody>{row}</tbody>
  </table>
);

const rowDefaultProps = {
  data: [],
  head: false,
};

describe('Row', () => {
  it('displays a table row', () => {
    render(renderRow(<Row {...rowDefaultProps} />));
    expect(screen.getByRole('row')).toBeInTheDocument();
  });

  it('renders a Cell when a single cell information is passed', () => {
    render(renderRow(<Row {...rowDefaultProps} data={oneCell} />));
    expect(Cell).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '1',
      }),
      expect.anything(),
    );
  });

  it('renders 10 cells when 10 cell information are passed', () => {
    render(renderRow(<Row {...rowDefaultProps} data={tenCells} />));
    expect(Cell).toHaveBeenCalledTimes(10);
  });

  it('renders a header Cell when the header is true', () => {
    render(renderRow(<Row data={oneCell} head />));
    expect(Cell).toHaveBeenCalledWith(
      expect.objectContaining({ head: true }),
      expect.anything(),
    );
  });

  it('renders a normal Cell as default', () => {
    render(renderRow(<Row data={oneCell} />));
    expect(Cell).toHaveBeenCalledWith(
      expect.objectContaining({ head: false }),
      expect.anything(),
    );
  });
});

const clickableRowDefaultProps = {
  data: [],
  disabled: false,
  onClick: () => {},
};

describe('ClickableRow', () => {
  it('displays a table row', () => {
    render(renderRow(<ClickableRow {...clickableRowDefaultProps} />));
    expect(screen.getByRole('row')).toBeInTheDocument();
  });

  it('displays a checkbox input to select the row', () => {
    render(renderRow(<ClickableRow {...clickableRowDefaultProps} />));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders a Cell when a single cell information is passed', () => {
    render(
      renderRow(<ClickableRow {...clickableRowDefaultProps} data={oneCell} />),
    );
    expect(Cell).toHaveBeenCalledWith(
      expect.objectContaining({
        value: '1',
      }),
      expect.anything(),
    );
  });

  it('renders 10 cells when 10 cell information are passed', () => {
    render(
      renderRow(<ClickableRow {...clickableRowDefaultProps} data={tenCells} />),
    );
    expect(Cell).toHaveBeenCalledTimes(10);
  });

  it('calls onClick when the checkbox is clicked', () => {
    const mockOnClick = jest.fn();
    render(
      renderRow(
        <ClickableRow {...clickableRowDefaultProps} onClick={mockOnClick} />,
      ),
    );

    userEvent.click(screen.getByRole('checkbox'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('disable the checkbox when disabled is true', () => {
    const mockOnClick = jest.fn();
    render(
      renderRow(<ClickableRow data={oneCell} onClick={mockOnClick} disabled />),
    );

    userEvent.click(screen.getByRole('checkbox'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
