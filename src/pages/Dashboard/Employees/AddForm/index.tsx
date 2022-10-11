import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

export declare interface AddFormInterface {
  onSubmit: (data: IFormData) => void
}

export declare interface IFormData {
  employeeName: string
  employeeEmail: string
  role: string
};

const initialState: IFormData = {
  employeeName: '',
  employeeEmail: '',
  role: '',
};

const AddForm = ({ onSubmit }: AddFormInterface): JSX.Element => {
  const [formData, setFormData] = useState<IFormData>(initialState);

  const submit = (): void => onSubmit(formData);
  const onValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFormData((data: IFormData) => ({ ...data, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">What are your new employee information?</h2>
      <input onChange={(e) => onValueChange(e)}/>
      <Input
        name='employeeName'
        value={formData.employeeName}
        placeholder='Enter employee name'
        label='Employee name'
        onChange={onValueChange}
        hasLabel
      />
      <Input
        name='employeeEmail'
        value={formData.employeeEmail}
        placeholder='Enter employee email'
        label='Employee email'
        onChange={onValueChange}
        hasLabel
      />
      <Input
        name="role"
        value={formData.role}
        placeholder='Enter employee role'
        label='Employee role'
        onChange={onValueChange}
        hasLabel
      />  {/* // TODO: Give choices to employee */}
      <Button text='Add employee' onClick={submit}/>
    </div>
  );
};

export default AddForm;
