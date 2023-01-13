import type { InputInterface } from '..';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';
import Select from '../../../components/Select';

export declare interface IProfileForm {
  initialState: IFormData;
  onSubmit: (data: IFormData) => Promise<void>;
}

export declare interface IFormData {
  businessName: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
  city: string;
  country: string;
  province: string;
}

export declare interface InputsProps extends InputInterface {
  type: 'string' | 'select';
  placeholder?: string;
}

const inputs: InputsProps[] = [
  {
    name: 'businessName',
    label: 'Business name',
    type: 'string',
  },
  {
    name: 'addressLineOne',
    label: 'Address',
    type: 'string',
  },
  {
    name: 'addressLineTwo',
    label: '',
    type: 'string',
  },
  {
    name: 'city',
    label: 'City',
    type: 'string',
  },
  {
    name: 'province',
    label: 'Province',
    type: 'select',
    placeholder: 'Ex.: Quebec',
  },
  {
    name: 'postalCode',
    label: 'Postal code',
    type: 'string',
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    placeholder: 'Ex.: Canada',
  },
];

const getItems = (type: string): any[] => {
  const items: { [key: string]: any } = {
    province: [
      {
        type: 'basic',
        value: 'QC',
        display: 'Quebec',
      },
      {
        type: 'basic',
        value: 'ON',
        display: 'Ontario',
      },
      {
        type: 'basic',
        value: 'BC',
        display: 'British Columbia',
      },
      {
        type: 'basic',
        value: 'MB',
        display: 'Manitoba',
      },
      {
        type: 'basic',
        value: 'SK',
        display: 'Saskatchewan',
      },
      {
        type: 'basic',
        value: 'PE',
        display: 'Prince Edward Island',
      },
      {
        type: 'basic',
        value: 'NS',
        display: 'Nova Scotia',
      },
      {
        type: 'basic',
        value: 'AB',
        display: 'Alberta',
      },
      {
        type: 'basic',
        value: 'NL',
        display: 'Newfoundland and Labrador',
      },
    ],
    country: [
      {
        type: 'basic',
        value: 'CAN',
        display: 'Canada',
      },
      {
        type: 'basic',
        value: 'USA',
        display: 'United States',
      },
      {
        type: 'basic',
        value: 'FRA',
        display: 'France',
      },
      {
        type: 'basic',
        value: 'GER',
        display: 'Germany',
      },
    ],
  };

  return items[type];
};

const ProfileForm = ({ initialState, onSubmit }: IProfileForm): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused1, _unused2, _unused3, register, submit] = useFormData<any>({
    initialState,
    onSubmit,
  });

  return (
    <>
      <h2 className="text-2xl font-semibold text-brand-blue-dark mb-7">
        {constant.FORM_TITLE}
      </h2>
      <div className="flex-1">
        {/* eslint-disable-next-line array-callback-return */}
        {inputs.map(({ name, label, ...rest }) => {
          if (rest.type === 'select') {
            return (
              <Select
                key={name}
                {...register(name, { required: false, pattern: /.*/ })}
                placeholder={rest.placeholder ?? ''}
                items={getItems(name)}
                label={label}
              />
            );
          }
          return (
            <Input
              key={name}
              {...register(name, { required: false, pattern: /.*/ })}
              placeholder=""
              label={label}
              size="sm"
              labelPosition="left"
              hasLabel
            />
          );
        })}
      </div>
      <div className="flex justify-end mt-6">
        <Button text="Next" onClick={submit} />
      </div>
    </>
  );
};

export default ProfileForm;
