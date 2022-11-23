import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData, { IErrorTemplate } from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface IAdminForm {
  onSubmit: (data: IFormData) => Promise<void>
}

export interface IFormData {
  adminName: string
  adminEmail: string
  adminPassword: string
};

export const initialState: IFormData = {
  adminName: '',
  adminEmail: '',
  adminPassword: '',
};

const errorTemplate: IErrorTemplate = {};

const AdminForm = ({ onSubmit }: IAdminForm): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, _, __, onValueChange, submit] = useFormData<IFormData>({ initialState, errorTemplate, onSubmit });

  return (
    <BoxForm
      heading={constant.FORM_HEADING}
      buttonText={constant.SUBMIT_BUTTON_TEXT}
      buttonOnClick={submit}
      backButtonTo=''
      hasBack
    >
      <Input
        name={constant.INPUT_ADMIN_NAME}
        value={formData.adminName}
        placeholder={constant.INPUT_ADMIN_NAME_PLACEHOLDER}
        label={constant.INPUT_ADMIN_NAME_LABEL}
        onChange={onValueChange}
        hasLabel/>
      <Input
        name={constant.INPUT_ADMIN_EMAIL}
        value={formData.adminEmail}
        placeholder={constant.INPUT_ADMIN_EMAIL_PLACEHOLDER}
        label={constant.INPUT_ADMIN_EMAIL_LABEL}
        onChange={onValueChange}
        hasLabel/>
      <Input
        name={constant.INPUT_ADMIN_PASSWORD}
        value={formData.adminPassword}
        placeholder={constant.INPUT_ADMIN_PASSWORD_PLACEHOLDER}
        label={constant.INPUT_ADMIN_PASSWORD_LABEL}
        onChange={onValueChange}
        type="password"
        hasLabel/>
    </BoxForm>
  );
};

export default AdminForm;
