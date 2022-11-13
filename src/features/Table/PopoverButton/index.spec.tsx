import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import PopoverButton from '.';

describe('test table', () => {
  it('should display the update and delte on click', async () => {
    render(
      <PopoverButton
        id='1'
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );

    expect(screen.getByText(/more_vert/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/more_vert/));

    expect(await screen.findByText(/Update/)).toBeInTheDocument();
    expect(await screen.findByText(/Delete/)).toBeInTheDocument();
  });

  it('should delete when delete click and update when update click', async () => {
    const mockOnUpdate = jest.fn();
    const mockOnDelete = jest.fn();

    render(
      <PopoverButton
        id='1'
        onDelete={mockOnDelete}
        onUpdate={mockOnUpdate}
      />
    );

    expect(screen.getByText(/more_vert/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/more_vert/));

    userEvent.click(await screen.findByText(/Delete/));
    void waitFor(() => expect(mockOnDelete).toHaveBeenCalled());

    userEvent.click(await screen.findByText(/Update/));
    void waitFor(() => expect(mockOnUpdate).toHaveBeenCalled());
  });

  it('should close the modal when click elsewhere', async () => {
    render(
      <>
        <span>asasd</span>
        <PopoverButton
          id='1'
          onDelete={jest.fn()}
          onUpdate={jest.fn()}
        />
      </>
    );

    userEvent.click(screen.getByText(/more_vert/));
    expect(await screen.findByText(/Update/)).toBeInTheDocument();

    userEvent.click(screen.getByText(/asasd/));
    void waitFor(() => expect(screen.queryByText(/Update/)).not.toBeInTheDocument());
  });
});
