import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import useFormData from '../../../../hooks/useFormData';
import * as constant from './constant';

export declare interface AddFormInterface {
  onSubmit: (data: IFormData) => Promise<void>;
}

export declare interface IFormData {
  employeeFirstName: string;
  employeeLastName: string;
  employeeEmail: string;
  role: string;
}

const initialState: IFormData = {
  employeeFirstName: '',
  employeeLastName: '',
  employeeEmail: '',
  role: '',
};

const AddForm = ({ onSubmit }: AddFormInterface): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused1, loading, error, register, submit] = useFormData<IFormData>({
    initialState,
    onSubmit,
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">
        {constant.FORM_HEADLINE}
      </h2>
      <div>
        <Input
          {...register(constant.INPUT_EMPLOYEE_FIRST_NAME, {
            required: false,
            pattern: /.{2,}/,
          })}
          placeholder={constant.INPUT_EMPLOYEE_FIRST_NAME_PLACEHOLDER}
          label={constant.INPUT_EMPLOYEE_FIRST_NAME_LABEL}
          hasLabel
        />
        <span className="error">
          {error[constant.INPUT_EMPLOYEE_FIRST_NAME] &&
            error[constant.INPUT_EMPLOYEE_FIRST_NAME]}
        </span>
      </div>
      <div>
        <Input
          {...register(constant.INPUT_EMPLOYEE_LAST_NAME, {
            required: false,
            pattern: /.{2,}/,
          })}
          placeholder={constant.INPUT_EMPLOYEE_LAST_NAME_PLACEHOLDER}
          label={constant.INPUT_EMPLOYEE_LAST_NAME_LABEL}
          hasLabel
        />
        <span className="error">
          {error[constant.INPUT_EMPLOYEE_LAST_NAME] &&
            error[constant.INPUT_EMPLOYEE_LAST_NAME]}
        </span>
      </div>
      <div>
        <Input
          {...register(constant.INPUT_EMPLOYEE_EMAIL, {
            required: false,
            pattern: /.+/,
          })}
          placeholder={constant.INPUT_EMPLOYEE_EMAIL_PLACEHOLDER}
          label={constant.INPUT_EMPLOYEE_EMAIL_LABEL}
          hasLabel
        />
        <span className="error">
          {error[constant.INPUT_EMPLOYEE_EMAIL] &&
            error[constant.INPUT_EMPLOYEE_EMAIL]}
        </span>
      </div>
      <div>
        <Input
          {...register(constant.INPUT_ROLE, { required: false, pattern: /.*/ })}
          placeholder={constant.INPUT_ROLE_PLACEHOLDER}
          label={constant.INPUT_ROLE_LABEL}
          hasLabel
        />
        <span className="error">
          {error[constant.INPUT_ROLE] && error[constant.INPUT_ROLE]}
        </span>
      </div>
      {/* // TODO: Give choices to employee */}
      <Button disabled={loading} text={constant.BUTTON_TEXT} onClick={submit} />
    </div>
  );
};

export default AddForm;
