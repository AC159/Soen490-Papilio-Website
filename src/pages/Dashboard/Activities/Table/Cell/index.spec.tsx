import { render, screen } from '@testing-library/react';
import Cell from '.';

const renderCell = (cell: React.ReactNode): JSX.Element => (
  <table>
    <tbody>
      <tr>{cell}</tr>
    </tbody>
  </table>
);

const defaultProps = {
  value: 'cell',
};

describe('Row', () => {
  it('display table body cell has default', () => {
    render(renderCell(<Cell {...defaultProps} />));
    expect(screen.getByText('cell', { selector: 'td' }));
  });

  it('display table header cell when head is true', () => {
    render(renderCell(<Cell {...defaultProps} head />));
    expect(screen.getByText('cell', { selector: 'th' }));
  });
});
