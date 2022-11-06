import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface ILoginForm {
  onSubmit: (data: IFormData) => Promise<void>
}

export interface IFormData {
  Email: string
  Password: string
};

export const initialState: IFormData = {
  Email: '',
  Password: '',
};

const LoginForm = ({ onSubmit }: ILoginForm): JSX.Element => {
  const [formData, onValueChange, submit] = useFormData<IFormData>({ initialState, onSubmit });

  return (
    <BoxForm
        heading={constant.FORM_HEADING}
        buttonText={constant.SUBMIT_BUTTON_TEXT}
        buttonOnClick={submit}
        backButtonTo=''
        hasBack
    >
      <Input
        name={constant.INPUT_EMAIL}
        value={formData.Email}
        placeholder={constant.INPUT_EMAIL_PLACEHOLDER}
        label={constant.INPUT_EMAIL_LABEL}
        onChange={onValueChange}
        hasLabel/>
      <Input
        name={constant.INPUT_PASSWORD}
        value={formData.Password}
        placeholder={constant.INPUT_PASSWORD_PLACEHOLDER}
        label={constant.INPUT_PASSWORD_LABEL}
        onChange={onValueChange}
        type='password'
        hasLabel/>
    </BoxForm>
  );
};

export default LoginForm;
