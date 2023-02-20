import { screen, render } from '@testing-library/react';
import Table from '.';
import Row, { ClickableRow } from './Row';

const oneActivity = [
  {
    id: 'a',
    title: 'A name',
    startTime: 'Oct 10 2022',
    endTime: 'Nov 10 2022',
    address: '123 address'
  },
];

const fiveActivities = Array.from('01234', (id) => ({
  id,
  title: 'Title',
  startTime: 'Oct 10 2022',
  endTime: 'Nov 10 2022',
  address: `123 address`,
}));

const defaultProps = {
  activities: [],
  headerContent: [],
};

jest.mock('./Row', () => ({
  __esModule: true,
  default: jest.fn(),
  ClickableRow: jest.fn(),
}));

describe('Table', () => {
  it('displays a table', () => {
    render(<Table {...defaultProps} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('displays a header row in the header', () => {
    render(<Table {...defaultProps} />);
    expect(Row).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        head: true,
      }),
      expect.anything(),
    );
  });

  it('displays row element in the table body', () => {
    render(<Table {...defaultProps} activities={oneActivity} />);
    expect(Row).toHaveBeenNthCalledWith(
      2,
      {
        data: [oneActivity[0].title, oneActivity[0].startTime, oneActivity[0].endTime, oneActivity[0].address,],
      },
      expect.anything(),
    );
  });

  it('displays 5 rows in the table body when 5 activities are passed', () => {
    render(<Table {...defaultProps} activities={fiveActivities} />);
    expect(Row).toHaveBeenLastCalledWith(
      {
        data: [
          fiveActivities[4].title,
          fiveActivities[4].startTime,
          fiveActivities[4].endTime,
          fiveActivities[4].address,
        ],
      },
      expect.anything(),
    );
  });

  it('displays clickable row when onSelect is passed as attribute to table', () => {
    const mockOnSelect = jest.fn();
    render(
      <Table
        {...defaultProps}
        activities={oneActivity}
        onSelect={mockOnSelect}
      />,
    );
    expect(ClickableRow).toHaveBeenCalled();
  });

  it('displays content in header that was passed to the table', () => {
    const header = ['Col1', 'Col2', 'Col3'];
    render(<Table {...defaultProps} headerContent={header} />);

    expect(Row).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        data: header,
      }),
      expect.anything(),
    );
  });

  it('enabled click on body row when onSelect function is passed', () => {
    const mockOnSelect = jest.fn();
    render(
      <Table
        {...defaultProps}
        activities={oneActivity}
        onSelect={mockOnSelect}
      />,
    );
    expect(ClickableRow).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [oneActivity[0].title, oneActivity[0].startTime, oneActivity[0].endTime, oneActivity[0].address,],
      }),
      expect.anything(),
    );
  });

  it('disabled click on body row when no onSelect function is passed', () => {
    render(<Table {...defaultProps} activities={oneActivity} />);
    expect(Row).toHaveBeenLastCalledWith(
      {
        data: [oneActivity[0].title, oneActivity[0].startTime, oneActivity[0].endTime, oneActivity[0].address,],
      },
      expect.anything(),
    );
  });

  it('disabled row when id to disabled match row id', () => {
    const id = oneActivity[0].id;
    const mockOnSelect = jest.fn();
    render(
      <Table
        {...defaultProps}
        activities={oneActivity}
        onSelect={mockOnSelect}
        disabledRowId={id}
      />,
    );

    expect(ClickableRow).toHaveBeenLastCalledWith(
      expect.objectContaining({
        disabled: true,
      }),
      expect.anything(),
    );
  });
});
