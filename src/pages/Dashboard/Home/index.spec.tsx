import { render, screen } from '@testing-library/react';
import HomeDashboard from '.';
import { BarGraph } from '../../../features/BarGraph';
import { registeredActivity, viewedActivity } from '../../../fakeData';

jest.mock('../../../features/BarGraph', () => ({
  BarGraph: jest.fn(() => <div data-testid="BarGraph" />),
}));

describe('Dashboard Home', () => {
  it('displays a welcome message', () => {
    render(<HomeDashboard />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('displays the viewedActivity bar graph', () => {
    render(<HomeDashboard />);
    expect(BarGraph).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        data: viewedActivity,
      }),
      expect.anything(),
    );
  });

  it('displays the registeredActivity bar graph', () => {
    render(<HomeDashboard />);
    expect(BarGraph).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        data: registeredActivity,
      }),
      expect.anything(),
    );
  });
});
