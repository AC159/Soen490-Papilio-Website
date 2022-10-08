import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';

const AdminForm = (): JSX.Element => {
  return (
    <BoxForm
      heading="Let's create your business root administrator"
      buttonText='Create account'
      buttonOnClick={() => {}}
      backButtonOnClick={() => {}}
      hasBack
    >
      <Input placeholder='Administrator full name' label='Full name' hasLabel/>
      <Input placeholder='Administrator email' label='Email' hasLabel/>
      <Input placeholder='Administrator password' label='Password' hasLabel/>
    </BoxForm>
  );
};

export default AdminForm;
