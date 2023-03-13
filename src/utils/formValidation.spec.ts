import {
  required,
  match,
  hasLength,
  combine,
  validateFields,
} from './formValidation';

describe('required', () => {
  it('passes without returning error message if something is written', () => {
    const validator = required('value');
    expect(validator('something')).not.toBeDefined();
  });

  it('fails if there is nothing in the input', () => {
    const validator = required('value');
    expect(validator('')).toEqual('value');
  });

  it('fails if only whitespace is entered', () => {
    const validator = required('value');
    expect(validator('   ')).toEqual('value');
  });
});

describe('match', () => {
  it('passes without returning an error message if input match pattern', () => {
    const validator = match(/.+/, 'value');
    expect(validator('a')).not.toBeDefined();
  });

  it('fails when the input does not match the pattern', () => {
    const validator = match(/aaa/, 'value');
    expect(validator('a')).toEqual('value');
  });
});

describe('length', () => {
  it('passes without returning an error message if input is at least length in size', () => {
    const validator = hasLength(2, 'value');
    expect(validator('as')).not.toBeDefined();
  });

  it('fails if input is less then specified length', () => {
    const validator = hasLength(2, 'value');
    expect(validator('a')).toEqual('value');
  });

  it('fails if whitespace is used to fill the length', () => {
    const validator = hasLength(2, 'value');
    expect(validator('a     ')).toEqual('value');
  });
});

const passes = (_: any): undefined => undefined;
const fails = (desc: string) => (_: any) => desc;

describe('combine', () => {
  it('passes if all child test passes', () => {
    const validator = combine(passes, passes);
    expect(validator('a')).not.toBeDefined();
  });

  it('fails if one of its children fails', () => {
    const validator = combine(passes, fails('value'));
    expect(validator('a')).toEqual('value');
  });

  it('fails with the first error', () => {
    const validator = combine(fails('error1'), fails('error2'));
    expect(validator('a')).toEqual('error1');
  });

  it('passes if no validators are passed', () => {
    const validator = combine(...[]);
    expect(validator('a')).not.toBeDefined();
  });
});

describe('validateFields', () => {
  it('validates a single field', () => {
    const validator = validateFields({ field: passes }, { field: 'a' });
    expect(validator).toEqual({ field: undefined });
  });

  it('validates more than a single field', () => {
    const validator = validateFields(
      { field1: passes, field2: passes },
      { field1: 'a', field2: 'b' },
    );

    expect(validator).toEqual({ field1: undefined, field2: undefined });
  });

  it('validates field when no validator are present', () => {
    const validator = validateFields({}, { field1: 'a' });

    expect(validator).toEqual({ field1: undefined });
  });
});
