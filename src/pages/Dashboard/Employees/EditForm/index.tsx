import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import useFormData from '../../../../hooks/useFormData';
import * as constant from './constant';

export declare interface EditFormInterface {
  onSubmit: (data: IFormData) => Promise<void>;
  employeeData: IFormData;

}

export declare interface IFormData {
  employeeFirstName: string;
  employeeLastName: string;
  employeeEmail: string;
  role: string;
}

const EditForm = ({ onSubmit, employeeData }: EditFormInterface): JSX.Element => {
  const initialState: IFormData = {
    employeeFirstName: employeeData.employeeFirstName,
    employeeLastName: employeeData.employeeLastName,
    employeeEmail: employeeData.employeeEmail,
    role: employeeData.role,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused1, _unused2, _unused3, register, submit] =
    useFormData<IFormData>({ initialState, onSubmit });

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">
        {constant.FORM_HEADLINE}
      </h2>
      <Input
        {...register(constant.INPUT_EMPLOYEE_FIRST_NAME, {
          required: false,
          pattern: /.*/,
        })}
        placeholder={constant.INPUT_EMPLOYEE_FIRST_NAME_PLACEHOLDER}
        label={constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL}
        hasLabel
      />
      <Input
        {...register(constant.INPUT_EMPLOYEE_LAST_NAME, {
          required: false,
          pattern: /.*/,
        })}
        placeholder={constant.INPUT_EMPLOYEE_LAST_NAME_PLACEHOLDER}
        label={constant.INPUT_EMPLOYEE_LAST_NAME_LABEL}
        hasLabel
      />
      <Input
        {...register(constant.INPUT_EMPLOYEE_EMAIL, {
          required: false,
          pattern: /.*/,
        })}
        placeholder={constant.INPUT_EMPLOYEE_EMAIL_PLACEHOLDER}
        label={constant.INPUT_EMPLOYEE_EMAIL_LABEL}
        hasLabel
      />
      <div className="flex space-x-2 mt-2">
        <Button
          text={constant.BUTTON_TEXT}
          onClick={submit}
        />
      </div>
    </div>
  );
};

export default EditForm;
