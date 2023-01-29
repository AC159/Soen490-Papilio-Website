import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Select, { ItemType, OptionList, SelectItem } from './index';

const defaultProps = {
  name: '',
  value: '',
  label: '',
  placeholder: '',
  items: [],
  onChange: async () => {},
  onManualChange: async () => {},
};

describe('select tests', () => {
  const options: ItemType[] = [
    { type: 'basic', value: '1', display: '1' },
    { type: 'basic', value: '2', display: '2' },
    { type: 'basic', value: '3', display: '3' },
  ];

  it('displays a text box to search the different options', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('inculdes the initial value', async () => {
    render(<Select {...defaultProps} value="value" />);
    expect(await screen.findByRole('textbox')).toHaveValue('value');
  });

  it.skip('hides the select input on load', () => {
    render(<Select {...defaultProps} items={options} />);
    expect(document.body.querySelector('select')).not.toBeInTheDocument();
  });

  it.skip('display a select input when entering the select text box', async () => {
    render(<Select {...defaultProps} items={options} />);

    userEvent.click(await screen.findByRole('textbox'));

    expect(document.body.querySelector('select')).toBeInTheDocument();
  });

  it('displays the select options when entering the select text box', async () => {
    render(<Select {...defaultProps} items={options} />);
    userEvent.click(await screen.findByRole('textbox'));

    expect(await screen.findByText('1')).toBeInTheDocument();
    expect(await screen.findByText('2')).toBeInTheDocument();
  });

  it('hides the options when leaving the select component', async () => {
    render(<Select {...defaultProps} items={options} />);

    userEvent.click(await screen.findByRole('textbox'));
    userEvent.click(document.body);

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('displays a option with image when type is not basic', async () => {
    const imageOption: ItemType[] = [
      { type: 'image', value: '1', display: '1', img: '🇨🇦' },
    ];

    render(<Select {...defaultProps} items={imageOption} />);

    userEvent.click(await screen.findByRole('textbox'));

    expect(await screen.findByText('🇨🇦')).toBeInTheDocument();
  });

  it.skip('displays the option value in textbox when option is clicked', async () => {
    render(<Select {...defaultProps} items={options} />);

    userEvent.click(await screen.findByRole('textbox'));
    await act(async () => userEvent.click(await screen.findByText('1')));

    expect(await screen.findByRole('textbox')).toHaveValue('1');
  });

  it.skip('references the 1st option when pressing down arrow', async () => {
    render(<Select {...defaultProps} items={options} />);

    await act(async () => userEvent.click(await screen.findByRole('textbox')));
    userEvent.keyboard('[ArrowDown]');

    expect(await screen.findByText('1')).toHaveProperty('selected', true);
  });

  it.skip('references the last option after scrolling though all the option with arrow down', async () => {
    render(<Select {...defaultProps} items={options} />);
    userEvent.keyboard('[ArrowDown>3/]');

    expect(await screen.findByText('3')).toHaveProperty('selected', true);
  });

  it.skip('references nothing when coming back to the initial position of text box', () => {
    render(<Select {...defaultProps} items={options} />);
    userEvent.keyboard('[ArrowDown>4/]');

    // expect(await screen.findAllByProperty('selected'));
  });

  it.skip('shows the selected value when scolling through the options', async () => {
    render(<Select {...defaultProps} items={options} />);

    await act(async () => userEvent.click(await screen.findByRole('textbox')));
    userEvent.keyboard('[ArrowDown]');

    expect(await screen.findByRole('textbox')).toHaveValue('1');
  });

  describe('SelectItem', () => {
    const defaultItemProps = {
      value: '',
      display: '',
      onClick: () => {},
    };

    it('displays the option value', () => {
      render(<SelectItem {...defaultItemProps} display="value" />);

      expect(screen.getByText('value')).toBeInTheDocument();
    });

    it.skip('marked has selected when clicked', async () => {
      render(<SelectItem {...defaultItemProps} />);
      userEvent.click(screen.getByRole('option'));

      expect(
        await screen.findByRole('option', { selected: true }),
      ).toBeInTheDocument();
    });

    it('is not marked has select on load', () => {
      render(<SelectItem {...defaultItemProps} />);

      expect(
        screen.queryByRole('option', { selected: true }),
      ).not.toBeInTheDocument();
    });

    it.skip('includes a value when loaded', () => {
      render(<SelectItem {...defaultItemProps} value="value" />);
      expect(screen.getByRole('option')).toHaveValue('value');
    });
  });

  describe('OptionList', () => {
    const listDefaultProps = {
      isDirty: true,
      data: [],
      onManualChange: () => {},
      name: '',
    };
    const options: ItemType[] = [
      { type: 'basic', value: '1', display: '1' },
      { type: 'basic', value: '2', display: '2' },
    ];

    it('returns empty div when loading', () => {
      render(<OptionList {...listDefaultProps} isDirty={false} />);
      expect(document.body).toHaveTextContent('');
    });

    it('displays items passed as props', () => {
      render(<OptionList {...listDefaultProps} data={options} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });
});
