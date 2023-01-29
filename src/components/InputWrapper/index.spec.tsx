import { render, screen } from '@testing-library/react';

import InputWrapper from './';

const defaultProps = {
  name: '',
  hasLabel: false,
};
const labelText = 'the label';

describe('InputWrapper', () => {
  it('renders an input as children', () => {
    render(
      <InputWrapper {...defaultProps}>
        <input />
      </InputWrapper>,
    );

    expect(screen.getByRole('textbox')).not.toBeNull();
  });

  it('renders a label when one is needed', () => {
    render(
      <InputWrapper {...defaultProps} hasLabel={true} label={labelText}>
        <div />
      </InputWrapper>,
    );

    expect(screen.getByText(labelText)).not.toBeNull();
  });

  it('renders no label as a default', () => {
    render(
      <InputWrapper {...defaultProps} label={labelText}>
        <div />
      </InputWrapper>,
    );

    expect(screen.queryByText(labelText)).toBeNull();
  });
});
