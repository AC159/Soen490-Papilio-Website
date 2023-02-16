import { render, screen } from '@testing-library/react';
import { Chart } from 'react-charts';

import { BarGraph } from '.';
import { registeredActivity } from '../../fakeData';

jest.mock('react-charts', () => ({
  Chart: jest.fn(() => <div data-testid="Chart" />),
}));

const defaultProps = {
  data: [],
  title: '',
};

describe('BarGraph', () => {
  it('displays the graph', () => {
    render(<BarGraph {...defaultProps} />);
    expect(Chart).toHaveBeenCalled();
  });

  it('displays a title', () => {
    render(<BarGraph {...defaultProps} title="A graph" />);
    expect(screen.getByText('A graph')).toBeInTheDocument();
  });

  it('contains a primary axis', () => {
    render(<BarGraph {...defaultProps} />);
    expect(Chart).toHaveBeenCalledWith(
      {
        options: expect.objectContaining({
          primaryAxis: expect.objectContaining({ getValue: expect.anything() }),
        }),
      },
      expect.anything(),
    );
  });

  it('contains a secondary axis', () => {
    render(<BarGraph {...defaultProps} />);
    expect(Chart).toHaveBeenCalledWith(
      {
        options: expect.objectContaining({
          secondaryAxes: expect.any(Array),
        }),
      },
      expect.anything(),
    );
  });

  it('calls with data', () => {
    render(<BarGraph {...defaultProps} data={registeredActivity} />);
    expect(Chart).toHaveBeenCalledWith(
      {
        options: expect.objectContaining({
          data: registeredActivity,
        }),
      },
      expect.anything(),
    );
  });
});
