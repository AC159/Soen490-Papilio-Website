import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import useFormData from '../../../../hooks/useFormData';
import * as constant from './constant';

export declare interface AddFormInterface {
  onSubmit: (data: IFormData) => Promise<void>
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
      <h2 className="text-2xl font-semibold mt-4.5">{constant.FORM_HEADLINE}</h2>
      <Input
        name={constant.INPUT_EMPLOYEE_NAME}
        value={formData.employeeName}
        placeholder={constant.INPUT_EMPLOYEE_NAME_PLACEHOLDER}
        label={constant.INPUT_EMPLOYEE_NAME_LABEL}
        onChange={onValueChange}
        hasLabel
      />
      <Input
        name={constant.INPUT_EMPLOYEE_EMAIL}
        value={formData.employeeEmail}
        placeholder={constant.INPUT_EMPLOYEE_EMAIL_PLACEHOLDER}
        label={constant.INPUT_EMPLOYEE_EMAIL_LABEL}
        onChange={onValueChange}
        hasLabel
      />
      <Input
        name={constant.INPUT_ROLE}
        value={formData.role}
        placeholder={constant.INPUT_ROLE_PLACEHOLDER}
        label={constant.INPUT_ROLE_LABEL}
        onChange={onValueChange}
        hasLabel
      />  {/* // TODO: Give choices to employee */}
      <Button text={constant.BUTTON_TEXT} onClick={submit}/>
    </div>
  );
};

export default AddForm;
