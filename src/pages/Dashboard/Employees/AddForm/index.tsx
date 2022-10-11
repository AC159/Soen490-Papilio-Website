import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import useFormData from '../../../../hooks/useFormData';

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
  const [formData, onValueChange, submit] = useFormData<IFormData>({ initialState, onSubmit });

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
