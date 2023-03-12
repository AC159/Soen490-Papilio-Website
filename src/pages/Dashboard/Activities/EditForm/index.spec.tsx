/* eslint-disable no-import-assign */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditForm from '.';
import * as constant from './constant';


const act = {
    id: '1',
    title: 'A name',
    startTime: 'Oct 10 2022',
    endTime: 'Nov 10 2022',
    address: '123 address',
    description: 'a description',
    costPerIndividual: 1.00,
    costPerGroup: 2.00,
    groupSize: 3,
};

const defaultProps = {
  activity: act,
  onSubmit: async () => {},
};

  it('displays the form header', () => {
    render(<EditForm {...defaultProps} />);
    expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
  });

  it('displays a button to edit the activity', () => {
    render(<EditForm {...defaultProps} />);
    expect(screen.getByText(constant.BUTTON_TEXT)).toBeInTheDocument();
  });

  it('calls onSubmit when the user clicks the edit button', async () => {
    const mockOnSubmit = jest.fn();
    render(<EditForm {...defaultProps} onSubmit={mockOnSubmit} />);

    userEvent.click(screen.getByText(constant.BUTTON_TEXT));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  const mockOnSubmit = jest.fn();

  it('updates current values', async () => {
    render(<EditForm onSubmit={mockOnSubmit} activity={act}/>);

    expect(screen.getByText(constant.FORM_HEADLINE)).toBeInTheDocument();
    userEvent.clear(await screen.findByDisplayValue('A name'));
    userEvent.type(await screen.findByPlaceholderText(constant.INPUT_TITLE_PLACEHOLDER), 'Bowling');
    userEvent.clear(await screen.findByDisplayValue('123 address'));
    userEvent.type(await screen.findByPlaceholderText(constant.INPUT_ADDRESS_PLACEHOLDER), '123 address, Montreal, QC, Canada, EXM PLE');
    userEvent.clear(await screen.findByDisplayValue('Oct 10 2022'));
    userEvent.type(await screen.findByPlaceholderText(constant.INPUT_STARTTIME_PLACEHOLDER), '01-09-2022');
    userEvent.clear(await screen.findByDisplayValue('Nov 10 2022'));
    userEvent.type(await screen.findByPlaceholderText(constant.INPUT_ENDTIME_PLACEHOLDER), '01-09-2023');
    userEvent.clear(await screen.findByDisplayValue('a description'));
    userEvent.type(await screen.findByPlaceholderText(constant.INPUT_DESCRIPTION_PLACEHOLDER), 'Bowl until you cant bowl no more');
    userEvent.clear(await screen.findByDisplayValue('1'));
    userEvent.type(await screen.findByPlaceholderText(constant.INPUT_COST_PER_INDV_PLACEHOLDER), '9.99');
    userEvent.clear(await screen.findByDisplayValue('2'));
    userEvent.type(await screen.findByPlaceholderText(constant.INPUT_COST_PER_GRP_PLACEHOLDER), '34.99');
    userEvent.clear(await screen.findByDisplayValue('3'));
    userEvent.type(await screen.findByPlaceholderText(constant.INPUT_GROUP_SIZE_PLACEHOLDER), '4');
    userEvent.click(await screen.findByText(constant.BUTTON_TEXT));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('1',
        expect.objectContaining({
          id:'1',
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
