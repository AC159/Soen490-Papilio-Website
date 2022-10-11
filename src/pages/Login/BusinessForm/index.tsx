import { useState } from 'react';

import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';

export declare interface IBusinessForm {
  onSubmit: (data: IFormData) => void
}

export declare interface IFormData {
  businessId: string
}

const initialState: IFormData = {
  businessId: '',
};

const BusinessForm = ({ onSubmit }: IBusinessForm): JSX.Element => {
  const [formData, setFormData] = useState<IFormData>(initialState);

  const submit = (): void => onSubmit(formData);
  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setFormData({ businessId: value });
  };

  return (
    <BoxForm
      heading='How would you like to name your business?'
      buttonText='Create business'
      buttonOnClick={submit}
    >
      <Input
        name="businessId"
        placeholder='Insert your business ID'
        value={formData.businessId}
        onChange={onValueChange}
      />
    </BoxForm>
  );
};

export default BusinessForm;
