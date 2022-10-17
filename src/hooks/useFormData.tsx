import { useState } from 'react';

export declare interface IUseFormData<T> {
  initialState: T
  onSubmit: (data: T) => Promise<void>
}

const useFormData = <T extends {}>({ initialState, onSubmit }: IUseFormData<T>): [T, (e: React.FormEvent<HTMLInputElement>) => void, () => Promise<void>] => {
  const [formData, setFormData] = useState<any>(initialState);

  const submit = async (): Promise<void> => await onSubmit(formData);
  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFormData((data: T) => ({ ...data, [name]: value }));
  };

  return [formData, onValueChange, submit];
};

export default useFormData;
