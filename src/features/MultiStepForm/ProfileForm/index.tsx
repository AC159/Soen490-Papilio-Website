// import Select from 'react-select';
import { AddressAutofill } from '@mapbox/search-js-react';
import type { InputInterface } from '..';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';
// import InputWrapper from '../../../components/InputWrapper';
// import Select from '../../../components/Select';

export declare interface IProfileForm {
  initialState: IFormData;
  onSubmit: (data: IFormData) => Promise<void>;
}

export declare interface IFormData {
  businessName: string;
  email: string;
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

// const inputs: InputsProps[] = [
//   {
//     name: 'businessName',
//     label: 'Business name',
//     type: 'string',
//   },
//   {
//     name: 'email',
//     label: 'Email',
//     type: 'string',
//   },
//   {
//     name: 'addressLineOne',
//     label: 'Address',
//     type: 'string',
//   },
//   {
//     name: 'addressLineTwo',
//     label: '',
//     type: 'string',
//   },
//   {
//     name: 'city',
//     label: 'City',
//     type: 'string',
//   },
//   {
//     name: 'province',
//     label: 'Province',
//     type: 'select',
//     placeholder: 'Ex.: Quebec',
//   },
//   {
//     name: 'postalCode',
//     label: 'Postal code',
//     type: 'string',
//   },
//   {
//     name: 'country',
//     label: 'Country',
//     type: 'select',
//     placeholder: 'Ex.: Canada',
//   },
// ];

// {inputs.map(({ name, label, ...rest }) => {
//   return (
//     <Input
//       key={name}
//       {...register(name, { required: false, pattern: /.*/ })}
//       placeholder=""
//       label={label}
//       size="sm"
//       labelPosition="left"
//       hasLabel
//     />
//   );
// })}

// const getItems = (type: string): any[] => {
//   const items: { [key: string]: any } = {
//     province: [
//       {
//         value: 'QC',
//         label: 'Quebec',
//       },
//       {
//         value: 'ON',
//         label: 'Ontario',
//       },
//       {
//         value: 'BC',
//         label: 'British Columbia',
//       },
//       {
//         value: 'MB',
//         label: 'Manitoba',
//       },
//       {
//         value: 'SK',
//         label: 'Saskatchewan',
//       },
//       {
//         value: 'PE',
//         label: 'Prince Edward Island',
//       },
//       {
//         value: 'NS',
//         label: 'Nova Scotia',
//       },
//       {
//         value: 'AB',
//         label: 'Alberta',
//       },
//       {
//         value: 'NL',
//         label: 'Newfoundland and Labrador',
//       },
//     ],
//     country: [
//       {
//         value: 'CAN',
//         label: 'Canada',
//       },
//       {
//         value: 'USA',
//         label: 'United States',
//       },
//       {
//         value: 'FRA',
//         label: 'France',
//       },
//       {
//         value: 'GER',
//         label: 'Germany',
//       },
//     ],
//   };

//   return items[type];
// };

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
      <form className="flex-1">
        <Input
          {...register('businessName', { required: false, pattern: /.*/ })}
          placeholder=""
          label="Business name"
          size="sm"
          labelPosition="left"
          hasLabel
        />
        <Input
          {...register('email', { required: false, pattern: /.*/ })}
          placeholder=""
          label="Email"
          size="sm"
          labelPosition="left"
          hasLabel
        />
        <AddressAutofill accessToken={process.env.REACT_APP_MAPBOX_TOKEN ?? ''}>
          <Input
            {...register('addressLineOne', {
              required: false,
              pattern: /.*/,
            })}
            placeholder=""
            label="Address"
            size="sm"
            labelPosition="left"
            autoComplete="address-line1"
            hasLabel
          />
        </AddressAutofill>
        <Input
          {...register('addressLineTwo', { required: false, pattern: /.*/ })}
          placeholder=""
          label=""
          size="sm"
          labelPosition="left"
          autoComplete="address-line2"
          hasLabel
        />
        <Input
          {...register('city', { required: false, pattern: /.*/ })}
          placeholder=""
          label="City"
          size="sm"
          labelPosition="left"
          autoComplete="address-level2"
          hasLabel
        />
        <Input
          {...register('province', { required: false, pattern: /.*/ })}
          placeholder=""
          label="Province"
          size="sm"
          labelPosition="left"
          autoComplete="address-level1"
          hasLabel
        />
        <Input
          {...register('postalCode', { required: false, pattern: /.*/ })}
          placeholder=""
          label="Postal code"
          size="sm"
          labelPosition="left"
          autoComplete="postal-code"
          hasLabel
        />
        <Input
          {...register('country', { required: false, pattern: /.*/ })}
          placeholder=""
          label="Country"
          size="sm"
          labelPosition="left"
          autoComplete="country"
          hasLabel
        />
      </form>
      <div className="flex justify-end mt-6">
        <Button text="Next" onClick={submit} />
      </div>
    </>
  );
};

export default ProfileForm;

// const { onManualChange, value, ...other } = register(name, {
//   required: false,
//   pattern: /.*/,
// });
// return (
//   <InputWrapper
//     key={name}
//     name={name}
//     label={label}
//     hasLabel={true}
//     labelPosition="left"
//   >
//     <Select
//       {...other}
//       placeholder={rest.placeholder ?? ''}
//       options={getItems(name)}
//       styles={{
//         control: (baseStyles) => ({
//           ...baseStyles,
//           borderColor: 'rgb(229, 230,235)',
//           borderWidth: 2,
//         }),
//       }}
//       classNames={{
//         container: () => 'w-4/6',
//         control: () => 'w-full',
//       }}
//       onChange={(values) => {
//         onManualChange(name, values.value);
//       }}
//     />
//   </InputWrapper>
// );
