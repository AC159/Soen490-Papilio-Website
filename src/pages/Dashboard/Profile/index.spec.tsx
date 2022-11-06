import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import ProfileDashboard from '.';
import { IconNames } from '../../../components/Icon';

describe('dashboard profile test', () => {
  it('should display header and have 7 pieces of information', () => {
    render(<ProfileDashboard />);

    expect(screen.getByText(/Business profile/)).toBeInTheDocument();

    const fields = screen.getAllByTestId('field');

    expect(fields).toHaveLength(7);
  });

  it('should show inputs when button click', async () => {
    render(<ProfileDashboard />);

    userEvent.click(screen.getAllByText(IconNames.EDIT_SQUARE)[0]);

    expect(await screen.findAllByRole('textbox')).toHaveLength(1);
  });

  it('should save new value when save button clicked', async () => {
    render(<ProfileDashboard />);

    userEvent.click(screen.getAllByText(IconNames.EDIT_SQUARE)[0]);
    expect(await screen.findAllByRole('textbox')).toHaveLength(1);
    expect(screen.getAllByTestId('field')).toHaveLength(6);
    userEvent.click(await screen.findByText(IconNames.SAVE));

    expect(screen.getAllByTestId('field')).toHaveLength(7);
  });
});
