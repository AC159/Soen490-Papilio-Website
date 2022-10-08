import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';

const BusinessForm = (): JSX.Element => {
  return (
    <BoxForm
      heading='How would you like to name your business?'
      buttonText='Create business'
      buttonOnClick={() => {}}
    >
      <Input placeholder='Insert your business ID'/>
    </BoxForm>
  );
};

export default BusinessForm;
