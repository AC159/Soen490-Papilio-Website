import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData from '../../../hooks/useFormData';

export declare interface IBusinessForm {
  onSubmit: (data: IFormData) => void
}

export declare interface IFormData {
  businessId: string
}

export const initialState: IFormData = {
  businessId: '',
};

const BusinessForm = ({ onSubmit }: IBusinessForm): JSX.Element => {
  const [formData, onValueChange, submit] = useFormData<IFormData>({ initialState, onSubmit });

  return (
    <BoxForm
      heading='How would you like to name your business?'
      buttonText='Create business'
      buttonOnClick={submit}
    >
      <Input
        name="businessId"
        placeholder='Insert your business ID'
        value={formData.businessId}
        onChange={onValueChange}
      />
    </BoxForm>
  );
};

export default BusinessForm;
