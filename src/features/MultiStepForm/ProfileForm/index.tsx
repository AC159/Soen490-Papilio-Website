import { AddressAutofill } from '@mapbox/search-js-react';
import type { InputInterface } from '..';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';

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
          {...register('businessName')}
          placeholder=""
          label="Business name"
          size="sm"
          labelPosition="left"
          hasLabel
        />
        <Input
          {...register('email')}
          placeholder=""
          label="Email"
          size="sm"
          labelPosition="left"
          hasLabel
        />
        <AddressAutofill accessToken={process.env.REACT_APP_MAPBOX_TOKEN ?? ''}>
          <Input
            {...register('addressLineOne')}
            placeholder=""
            label="Address"
            size="sm"
            labelPosition="left"
            autoComplete="address-line1"
            hasLabel
          />
        </AddressAutofill>
        <Input
          {...register('addressLineTwo')}
          placeholder=""
          label=""
          size="sm"
          labelPosition="left"
          autoComplete="address-line2"
          hasLabel
        />
        <Input
          {...register('city')}
          placeholder=""
          label="City"
          size="sm"
          labelPosition="left"
          autoComplete="address-level2"
          hasLabel
        />
        <Input
          {...register('province')}
          placeholder=""
          label="Province"
          size="sm"
          labelPosition="left"
          autoComplete="address-level1"
          hasLabel
        />
        <Input
          {...register('postalCode')}
          placeholder=""
          label="Postal code"
          size="sm"
          labelPosition="left"
          autoComplete="postal-code"
          hasLabel
        />
        <Input
          {...register('country')}
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
