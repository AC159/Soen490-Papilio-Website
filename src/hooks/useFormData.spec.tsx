/* eslint-disable @typescript-eslint/no-misused-promises */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Input from '../components/Input';
import useFormData, {
  PatternProps,
  RequiredProps,
  DEFAULT_PATTERN_MESSAGE,
  DEFAULT_REQUIRED_MESSAGE,
} from './useFormData';

const UserFormDataExample = ({
  onSubmit,
  options,
}: {
  onSubmit: (data: { field: string }) => Promise<void>;
  options: {
    required?: boolean | RequiredProps;
    pattern?: RegExp | PatternProps;
  };
}): JSX.Element => {
  const [formData, loading, errors, register, submit] = useFormData({
    initialState: { field: '' },
    onSubmit,
  });
  return (
    <>
      <p>Value: {formData.field}</p>
      <Input {...register('field', options)} placeholder="" />
      <span data-testid="error">{errors.field && errors.field}</span>
      <button disabled={loading} onClick={submit} />
    </>
  );
};

const defaultOptions = { required: false, pattern: /.*/ };
const defaultProps = { onSubmit: async () => {}, options: defaultOptions };
describe('useFormData', () => {
  it('saves fields data on type', async () => {
    render(<UserFormDataExample {...defaultProps} />);
    act(() => userEvent.type(screen.getByRole('textbox'), 'hello'));
    expect(await screen.findByText('Value: hello')).toBeInTheDocument();
  });

  it('shows field as required when blur with empty value', async () => {
    const options = { ...defaultOptions, required: true };
    render(<UserFormDataExample {...defaultProps} options={options} />);
    userEvent.click(screen.getByRole('textbox'));
    act(() => userEvent.click(screen.getByText('Value:')));
    expect(await screen.findByTestId('error')).toHaveTextContent(
      DEFAULT_REQUIRED_MESSAGE,
    );
  });

  it('display error when input does not fit pattern', async () => {
    const options = { ...defaultOptions, pattern: /aaa/ };
    render(<UserFormDataExample {...defaultProps} options={options} />);
    act(() => userEvent.type(screen.getByRole('textbox'), 'a'));
    act(() => userEvent.click(screen.getByText(/Value:/)));
    expect(await screen.findByTestId('error')).toHaveTextContent(
      DEFAULT_PATTERN_MESSAGE,
    );
  });

  it('disable the button on submit', async () => {
    render(<UserFormDataExample {...defaultProps} options={{}} />);
    act(() => userEvent.click(screen.getByRole('button')));
    await waitFor(async () =>
      expect(await screen.findByRole('button')).toBeDisabled(),
    );
    expect(await screen.findByRole('button')).toHaveAttribute('disabled', '');
  });

  it('hides error message before first onBlur', async () => {
    const options = { ...defaultOptions, pattern: /aaa/ };
    render(<UserFormDataExample {...defaultProps} options={options} />);
    act(() => userEvent.type(screen.getByRole('textbox'), 'a'));
    expect(await screen.findByTestId('error')).not.toHaveTextContent(
      DEFAULT_PATTERN_MESSAGE,
    );
  });

  it('update error message after first onBlur', async () => {
    const options = { required: true, pattern: /aaa/ };
    render(<UserFormDataExample {...defaultProps} options={options} />);
    userEvent.click(screen.getByRole('textbox'));
    act(() => userEvent.click(screen.getByText('Value:')));
    act(() => userEvent.type(screen.getByRole('textbox'), 'a'));
    expect(await screen.findByTestId('error')).toHaveTextContent(
      DEFAULT_PATTERN_MESSAGE,
    );
  });

  it('validates all field on submit and display error message', async () => {
    const options = { ...defaultOptions, required: true };
    render(<UserFormDataExample {...defaultProps} options={options} />);
    await act(async () => userEvent.click(await screen.findByRole('button')));
    expect(await screen.findByTestId('error')).toHaveTextContent(
      DEFAULT_REQUIRED_MESSAGE,
    );
  });

  it('validates all field on submit and display no message if all test passes', async () => {
    const options = { ...defaultOptions, required: true };
    render(<UserFormDataExample {...defaultProps} options={options} />);
    await act(async () => userEvent.type(screen.getByRole('textbox'), 'a'));
    await act(async () => userEvent.click(await screen.findByRole('button')));
    expect(await screen.findByTestId('error')).toHaveTextContent('');
  });

  it('displays field as required with custom error when blur with empty value', async () => {
    const errorMessage = 'Field is required.';
    const options = {
      ...defaultOptions,
      required: { required: true, message: errorMessage },
    };
    render(<UserFormDataExample {...defaultProps} options={options} />);
    userEvent.click(screen.getByRole('textbox'));
    act(() => userEvent.click(screen.getByText('Value:')));
    expect(await screen.findByTestId('error')).toHaveTextContent(errorMessage);
  });

  it('display a custom error when input does not fit pattern', async () => {
    const errorMessage = 'Field should be aaa';
    const options = {
      ...defaultOptions,
      pattern: { pattern: /aaa/, message: errorMessage },
    };
    render(<UserFormDataExample {...defaultProps} options={options} />);
    act(() => userEvent.type(screen.getByRole('textbox'), 'a'));
    act(() => userEvent.click(screen.getByText(/Value:/)));
    expect(await screen.findByTestId('error')).toHaveTextContent(errorMessage);
  });
});
