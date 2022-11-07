import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface ILoginForm {
  onSubmit: (data: IFormData) => Promise<void>
}

export interface IFormData {
  email: string
  password: string
  businessId: string
};

export const initialState: IFormData = {
  email: '',
  password: '',
  businessId:'',
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
        value={formData.email}
        placeholder={constant.INPUT_EMAIL_PLACEHOLDER}
        label={constant.INPUT_EMAIL_LABEL}
        onChange={onValueChange}
        hasLabel/>
      <Input
        name={constant.INPUT_PASSWORD}
        value={formData.password}
        placeholder={constant.INPUT_PASSWORD_PLACEHOLDER}
        label={constant.INPUT_PASSWORD_LABEL}
        onChange={onValueChange}
        type='password'
        hasLabel/>
      <Input
       name={constant.INPUT_BUSINESS_ID}
       value={formData.businessId}
       placeholder={constant.INPUT_BUSINESS_ID_PLACEHOLDER}
       label={constant.INPUT_BUSINESS_ID_LABEL}
       onChange={onValueChange}
       hasLabel/>

    </BoxForm>
  );
};

export default LoginForm;
