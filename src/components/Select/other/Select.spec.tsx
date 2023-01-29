import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Select } from './Select';

const createOption = (value: string = ''): any => ({ value });
const listOptions = (id: string): any => screen.getByTestId(id).childNodes;
const findListOptions = async (id: string): Promise<any> =>
  await screen.findByTestId(id);

const StateWrapper = ({ children }: { children: any }): JSX.Element => {
  const [value, setValue] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(event.target.value);
  const onSelect = (event: React.ChangeEvent<HTMLOptionElement>): void => {
    setValue(event.target.value);
  };

  return children(value, onChange, onSelect);
};

const defaultProps = {
  label: 'Select',
  options: [createOption(), createOption()],
  value: '',
  onChange: () => {},
};

describe('Select', () => {
  it('displays a text box', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays a label', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByRole('combobox', { name: 'Select' }));
  });

  it('displays a label according to props', () => {
    render(<Select {...defaultProps} label="Label" />);
    expect(screen.getByRole('combobox', { name: 'Label' }));
  });

  it('displays a list for the different options', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByTestId('optionsList')).toBeInTheDocument();
  });

  it('hides options when component is loaded', () => {
    render(<Select {...defaultProps} />);
    expect(listOptions('optionsList')).toHaveLength(0);
  });

  it('displays the options when clicking on the text box', async () => {
    render(<Select {...defaultProps} />);
    userEvent.click(screen.getByRole('combobox'));
    expect((await findListOptions('optionsList')).childNodes).toHaveLength(2);
  });

  it('displays options passed as props on clicking on the text box', async () => {
    const options = [createOption()];
    render(<Select {...defaultProps} options={options} />);
    userEvent.click(screen.getByRole('combobox'));
    expect((await findListOptions('optionsList')).childNodes).toHaveLength(1);
  });

  it('displays the option value as string', async () => {
    const options = [createOption('a')];
    render(<Select {...defaultProps} options={options} />);
    userEvent.click(screen.getByRole('combobox'));
    expect(
      await screen.findByText('a', { selector: 'option' }),
    ).toBeInTheDocument();
  });

  it('hides the options when clicking outside the text box', async () => {
    render(<Select {...defaultProps} />);
    userEvent.click(screen.getByRole('combobox'));
    userEvent.click(document.body);
    expect((await findListOptions('optionsList')).childNodes).toHaveLength(0);
  });

  it('includes the value when loading the component', () => {
    render(<Select {...defaultProps} value="value" />);
    expect(screen.getByRole('combobox')).toHaveValue('value');
  });

  it('calls onChange method when inserting element in text box', async () => {
    const mockOnChange = jest.fn();
    render(<Select {...defaultProps} onChange={mockOnChange} />);
    userEvent.type(screen.getByRole('combobox'), 'a');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('saves the changed input into the mock value', async () => {
    render(
      <StateWrapper>
        {(
          value: string,
          onchange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        ) => <Select {...defaultProps} value={value} onChange={onchange} />}
      </StateWrapper>,
    );
    userEvent.type(screen.getByRole('combobox'), 'a');

    expect(screen.getByRole('combobox')).toHaveValue('a');
  });

  it('filters options based on the input typed in text box', async () => {
    const options = [createOption('a'), createOption('b'), createOption('ba')];
    render(
      <StateWrapper>
        {(
          value: string,
          onchange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        ) => (
          <Select
            {...defaultProps}
            value={value}
            onChange={onchange}
            options={options}
          />
        )}
      </StateWrapper>,
    );

    userEvent.type(screen.getByRole('combobox'), 'a');
    expect((await findListOptions('optionsList')).childNodes).toHaveLength(2);
  });

  it('shows all items when removing what is inserted in the textbox', async () => {
    const options = [createOption('a'), createOption('b'), createOption('ba')];
    render(
      <StateWrapper>
        {(
          value: string,
          onchange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        ) => (
          <Select
            {...defaultProps}
            value={value}
            onChange={onchange}
            options={options}
          />
        )}
      </StateWrapper>,
    );

    userEvent.type(screen.getByRole('combobox'), 'ac');
    userEvent.type(await screen.findByRole('combobox'), '{backspace>5}');

    expect((await findListOptions('optionsList')).childNodes).toHaveLength(3);
  });

  it('returns option as value when the user click on the option', async () => {
    const options = [createOption('a')];
    render(
      <StateWrapper>
        {(
          value: string,
          onchange: (event: React.ChangeEvent<HTMLInputElement>) => void,
          onSelect: (event: React.MouseEvent<HTMLOptionElement>) => void,
        ) => (
          <Select
            {...defaultProps}
            value={value}
            onChange={onchange}
            options={options}
            onOptionClick={onSelect}
          />
        )}
      </StateWrapper>,
    );
    userEvent.click(screen.getByRole('combobox'));
    userEvent.click(await screen.findByText('a', { selector: 'option' }));

    expect(await screen.findByRole('combobox')).toHaveValue('a');
  });

  it('displays only the selected value when the user click on the option', async () => {
    const options = [createOption('a'), createOption('b')];
    render(
      <StateWrapper>
        {(
          value: string,
          onchange: (event: React.ChangeEvent<HTMLInputElement>) => void,
          onSelect: (event: React.MouseEvent<HTMLOptionElement>) => void,
        ) => (
          <Select
            {...defaultProps}
            value={value}
            onChange={onchange}
            options={options}
            onOptionClick={onSelect}
          />
        )}
      </StateWrapper>,
    );
    userEvent.click(screen.getByRole('combobox'));
    userEvent.click(await screen.findByText('a', { selector: 'option' }));

    expect((await findListOptions('optionsList')).childNodes).toHaveLength(1);
  });
});
