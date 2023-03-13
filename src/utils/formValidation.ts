/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

export const required = (description: string) => (value: string) =>
  !value || value.trim() === '' ? description : undefined;

export const match = (regex: RegExp, description: string) => (value: string) =>
  !value.match(regex) ? description : undefined;

export const hasLength =
  (len: number, description: string) => (value: string) =>
    value.trim().length < len ? description : undefined;

export const combine =
  (...validators: Function[]) =>
  (value: string) =>
    validators.reduce((prev, curr) => prev ?? curr(value), undefined);

export const validateFields = (
  validators: { [key: string]: Function },
  fields: { [key: string]: any },
): any =>
  Object.entries(fields).reduce(
    (prev, [field, value]) => ({
      ...prev,
      [field]:
        validators[field] !== undefined ? validators[field](value) : undefined,
    }),
    {},
  );
