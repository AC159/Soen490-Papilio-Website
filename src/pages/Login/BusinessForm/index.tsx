import Input from '../../../components/Input';
import BoxForm from '../../../features/BoxForm';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface IBusinessForm {
  onSubmit: (data: IFormData) => Promise<void>
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
      heading={constant.FORM_HEADING}
      buttonText={constant.SUBMIT_BUTTON_TEXT}
      buttonOnClick={submit}
    >
      <Input
        name={constant.INPUT_BUSINESS_ID}
        placeholder={constant.INPUT_BUSINESS_PLACEHOLDER}
        value={formData.businessId}
        onChange={onValueChange}
      />
    </BoxForm>
  );
};

export default BusinessForm;
