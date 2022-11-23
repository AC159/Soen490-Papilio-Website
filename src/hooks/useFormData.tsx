import { useState } from 'react';

import { ERROR_CODE } from '../utils/enum';

export declare interface IErrorTemplate {
  [key: string]: IError
}

declare interface IError {
  required: boolean
  pattern: RegExp
}

export declare interface IUseFormData<T> {
  initialState: T
  errorTemplate: IErrorTemplate
  onSubmit: (data: T) => Promise<void>
}

const useFormData = <T extends {}>({ initialState, errorTemplate, onSubmit }: IUseFormData<T>): [T, boolean, { [key: string]: number }, (e: React.FormEvent<HTMLInputElement>) => void, () => Promise<void>] => {
  const [formData, setFormData] = useState<any>(initialState);
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (): Promise<void> => {
    setLoading(true);
    await validateFormData(formData)
      .then(async () => {
        await onSubmit(formData);
      })
      .catch(e => console.error(e.message));
    setLoading(false);
  };

  const validateFormData = async (data: T): Promise<void> => {
    const invalidCount = Object.entries(data).map(([key, value]) => validate(errorTemplate[key], key, value)).reduce((acc, value) => acc + value, 0);

    if (invalidCount === 0) {
      return await Promise.resolve();
    }
    return await Promise.reject(new Error('Error are present'));
  };

  const validate = (error: IError | undefined, key: string, value: any): number => {
    if (error === undefined) { return 0; }
    if (error.required && value === '') {
      setError(prev => ({ ...prev, [key]: ERROR_CODE.REQUIRED_ERROR }));
      return 1;
    } else if (typeof value === 'string' && !error.pattern.test(value)) {
      setError(prev => ({ ...prev, [key]: ERROR_CODE.PATTERN_ERROR }));
      return 1;
    } else {
      setError(prev => ({ ...prev, [key]: null }));
      return 0;
    }
  };

  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    validate(errorTemplate[name], name, value);
    setFormData((data: T) => ({ ...data, [name]: value }));
  };

  return [formData, loading, errors, onValueChange, submit];
};

export default useFormData;
