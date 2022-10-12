import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData from '../../../hooks/useFormData';

export declare interface IAdminForm {
  onSubmit: (data: IFormData) => void
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

const AdminForm = ({ onSubmit }: IAdminForm): JSX.Element => {
  const [formData, onValueChange, submit] = useFormData<IFormData>({ initialState, onSubmit });

  return (
    <BoxForm
      heading="Let's create your business root administrator"
      buttonText='Create account'
      buttonOnClick={submit}
      backButtonOnClick={() => {}}
      hasBack
    >
      <Input
        name='adminName'
        value={formData.adminName}
        placeholder='Administrator full name'
        label='Full name'
        onChange={onValueChange}
        hasLabel/>
      <Input
        name='adminEmail'
        value={formData.adminEmail}
        placeholder='Administrator email'
        label='Email'
        onChange={onValueChange}
        hasLabel/>
      <Input
        name='adminPassword'
        value={formData.adminPassword}
        placeholder='Administrator password'
        label='Password'
        onChange={onValueChange}
        type="password"
        hasLabel/>
    </BoxForm>
  );
};

export default AdminForm;
