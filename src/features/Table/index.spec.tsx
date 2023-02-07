import { screen, render } from '@testing-library/react';
import Table from '.';
import Row, { ClickableRow } from './Row';

const oneEmployee = [
  {
    id: 'firebaseId',
    name: 'John Smith',
    email: 'fake@email.com',
    role: 'Admin',
  },
];

const fiveEmployees = Array.from('01234', (id) => ({
  id,
  name: 'John Smith',
  email: `fake${id}@email.com`,
  role: 'Admin',
}));

const defaultProps = {
  employees: [],
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
    render(<Table {...defaultProps} employees={oneEmployee} />);
    expect(Row).toHaveBeenNthCalledWith(
      2,
      {
        data: [oneEmployee[0].name, oneEmployee[0].email, oneEmployee[0].role],
      },
      expect.anything(),
    );
  });

  it('displays 5 rows in the table body when 5 employees are passed', () => {
    render(<Table {...defaultProps} employees={fiveEmployees} />);
    expect(Row).toHaveBeenLastCalledWith(
      {
        data: [
          fiveEmployees[4].name,
          fiveEmployees[4].email,
          fiveEmployees[4].role,
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
        employees={oneEmployee}
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
        employees={oneEmployee}
        onSelect={mockOnSelect}
      />,
    );
    expect(ClickableRow).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [oneEmployee[0].name, oneEmployee[0].email, oneEmployee[0].role],
      }),
      expect.anything(),
    );
  });

  it('disabled click on body row when no onSelect function is passed', () => {
    render(<Table {...defaultProps} employees={oneEmployee} />);
    expect(Row).toHaveBeenLastCalledWith(
      {
        data: [oneEmployee[0].name, oneEmployee[0].email, oneEmployee[0].role],
      },
      expect.anything(),
    );
  });

  it('disabled row when id to disabled match row id', () => {
    const id = oneEmployee[0].id;
    const mockOnSelect = jest.fn();
    render(
      <Table
        {...defaultProps}
        employees={oneEmployee}
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
