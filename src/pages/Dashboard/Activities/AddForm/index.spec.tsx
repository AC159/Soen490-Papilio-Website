import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import AddForm from '.';
import * as constant from './constant';

test('logic test', async () => {
  const mockOnSubmit = jest.fn();

  render(<AddForm onSubmit={mockOnSubmit} />);

  expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(constant.INPUT_TITLE_PLACEHOLDER),
      'Bowling',
    ),
  );
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(constant.INPUT_ADDRESS_PLACEHOLDER),
      '123 address, Montreal, QC, Canada, EXM PLE',
    ),
  );
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(constant.INPUT_STARTTIME_PLACEHOLDER),
      '01-09-2022',
    ),
  );
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(constant.INPUT_ENDTIME_PLACEHOLDER),
      '01-09-2023',
    ),
  );
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(
        constant.INPUT_DESCRIPTION_PLACEHOLDER,
      ),
      'Bowl until you cant bowl no more',
    ),
  );
  await act(async () =>
    userEvent.clear(
      await screen.findByPlaceholderText(
        constant.INPUT_COST_PER_INDV_PLACEHOLDER,
      ),
    ),
  );
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(
        constant.INPUT_COST_PER_INDV_PLACEHOLDER,
      ),
      '9.99',
    ),
  );
  await act(async () =>
    userEvent.clear(
      await screen.findByPlaceholderText(
        constant.INPUT_COST_PER_GRP_PLACEHOLDER,
      ),
    ),
  );
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(
        constant.INPUT_COST_PER_GRP_PLACEHOLDER,
      ),
      '34.99',
    ),
  );
  await act(async () =>
    userEvent.clear(
      await screen.findByPlaceholderText(constant.INPUT_GROUP_SIZE_PLACEHOLDER),
    ),
  );
  await act(async () =>
    userEvent.type(
      await screen.findByPlaceholderText(constant.INPUT_GROUP_SIZE_PLACEHOLDER),
      '4',
    ),
  );
  await act(async () =>
    userEvent.click(await screen.findByText(constant.BUTTON_TEXT)),
  );

  await waitFor(() => {
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Bowling',
        address: '123 address, Montreal, QC, Canada, EXM PLE',
        startTime: '01-09-2022',
        endTime: '01-09-2023',
        description: 'Bowl until you cant bowl no more',
        costPerIndividual: '9.99',
        costPerGroup: '34.99',
        groupSize: '4',
      }),
    );
  });
});
