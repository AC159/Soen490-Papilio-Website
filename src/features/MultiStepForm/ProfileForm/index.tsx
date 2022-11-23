
import type { InputInterface } from '..';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useFormData, { IErrorTemplate } from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface IProfileForm {
  initialState: IFormData
  onSubmit: (data: IFormData) => Promise<void>
}

export declare interface IFormData {
  businessName: string
  addressLineOne: string
  addressLineTwo: string
  postalCode: string
  city: string
  country: string
  province: string
}

const inputs: InputInterface[] = [
  {
    name: 'businessName',
    label: 'Business name',
  },
  {
    name: 'addressLineOne',
    label: 'Address',
  },
  {
    name: 'addressLineTwo',
    label: '',
  },
  {
    name: 'city',
    label: 'City',
  },
  {
    name: 'province',
    label: 'Province',
  },
  {
    name: 'postalCode',
    label: 'Postal code',
  },
  {
    name: 'country',
    label: 'Country',
  },
];

const errorTemplate: IErrorTemplate = {};

const ProfileForm = ({ initialState, onSubmit }: IProfileForm): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, _, __, onValueChange, submit] = useFormData<any>({ initialState, errorTemplate, onSubmit });

  return (
    <>
      <h2 className='text-2xl font-semibold text-brand-blue-dark mb-7'>{constant.FORM_TITLE}</h2>
      <div className='flex-1'>
      {inputs.map(({ name, label }) => (
        <Input
          key={name}
          name={name}
          placeholder=''
          value={formData[name]}
          label={label}
          size='sm'
          labelPosition='left'
          onChange={onValueChange}
          hasLabel
        />
      ))}
      </div>
      <div className='flex justify-end mt-6'>
        <Button
          text="Next"
          onClick={submit}
        />
      </div>
    </>
  );
};

export default ProfileForm;
