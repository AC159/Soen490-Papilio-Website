import { render, screen } from '@testing-library/react';
import HomeDashboard from '.';
import { BarGraph } from '../../../features/BarGraph';
import { registeredActivity, viewedActivity } from '../../../fakeData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

jest.mock('../../../features/BarGraph', () => ({
  BarGraph: jest.fn(() => <div data-testid="BarGraph" />),
}));

describe('Dashboard Home', () => {
  it('displays a welcome message', () => {
    render(<HomeDashboard />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('displays a subtitle to page Header', () => {
    render(<HomeDashboard />);
    expect(screen.getByText('All activities', { selector: 'h5' }));
  });

  it('displays a select element', () => {
    render(<HomeDashboard />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('selects all activities as default option', () => {
    render(<HomeDashboard />);
    expect(
      // @ts-expect-error
      screen.getByRole('option', { name: 'All activities' }).selected,
    ).toBeTruthy();
  });

  it('loads other activities on first load', async () => {
    render(<HomeDashboard />);
    expect(
      (await screen.findAllByRole('option')).map((x) => x.innerHTML),
    ).toEqual([
      'All activities',
      'activity 1',
      'activity 2',
      'activity 3',
      'activity 4',
      'activity 5',
    ]);
  });

  it('changes activities when new one is selected in select', () => {
    render(<HomeDashboard />);
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'activity 2' }),
      ),
    );

    expect(
      // @ts-expect-error
      screen.getByRole('option', { name: 'activity 2' }).selected,
    ).toBeTruthy();
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
    expect(BarGraph).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: registeredActivity,
      }),
      expect.anything(),
    );
  });

  it('displays a title for all activities', () => {
    render(<HomeDashboard />);
    expect(BarGraph).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: 'Activity viewed for all activities',
      }),
      expect.anything(),
    );
    expect(BarGraph).toHaveBeenLastCalledWith(
      expect.objectContaining({
        title: 'Activity registered for all activities',
      }),
      expect.anything(),
    );
  });

  it('displays a title for the specific activity when selected', () => {
    render(<HomeDashboard />);
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'activity 2' }),
      ),
    );

    expect(BarGraph).toHaveBeenNthCalledWith(
      // @ts-expect-error
      BarGraph.mock.calls.length - 1,
      expect.objectContaining({
        title: 'Activity viewed for activity 2',
      }),
      expect.anything(),
    );
    expect(BarGraph).toHaveBeenLastCalledWith(
      expect.objectContaining({
        title: 'Activity registered for activity 2',
      }),
      expect.anything(),
    );
  });

  it('displays a subtitle for the specific activity slected', async () => {
    render(<HomeDashboard />);
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'activity 2' }),
      ),
    );

    expect(await screen.findByText('Activity 2', { selector: 'h5' }));
  });

  it('filters the statistics for the selected activity for the Activity view graph', () => {
    render(<HomeDashboard />);
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'activity 2' }),
      ),
    );

    expect(BarGraph).toHaveBeenNthCalledWith(
      // @ts-expect-error
      BarGraph.mock.calls.length - 1,
      expect.objectContaining({
        data: viewedActivity.filter((x) => x.label === 'activity 2'),
      }),
      expect.anything(),
    );
  });

  it('filters the statistics for the selected activity for the Activity registered graph', async () => {
    render(<HomeDashboard />);
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'activity 2' }),
      ),
    );

    expect(BarGraph).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: registeredActivity.filter((x) => x.label === 'activity 2'),
      }),
      expect.anything(),
    );
    await act(async () => await Promise.resolve());
  });

  it('remove the filter on Activity view graph when coming back to all activities', () => {
    render(<HomeDashboard />);
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'activity 2' }),
      ),
    );
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getAllByRole('option')[0],
      ),
    );

    expect(BarGraph).toHaveBeenNthCalledWith(
      // @ts-expect-error
      BarGraph.mock.calls.length - 1,
      expect.objectContaining({
        data: viewedActivity,
      }),
      expect.anything(),
    );
  });

  it('remove the filter on Activity registered graph when coming back to all activities', () => {
    render(<HomeDashboard />);
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'activity 2' }),
      ),
    );
    act(() =>
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getAllByRole('option')[0],
      ),
    );

    expect(BarGraph).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: registeredActivity,
      }),
      expect.anything(),
    );
  });
});
