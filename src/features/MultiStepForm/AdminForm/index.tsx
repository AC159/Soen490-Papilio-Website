import type { InputInterface } from '..';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useFormData from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface IAdminForm {
  initialState: IFormData;
  onSubmit: (data: IFormData) => Promise<void>;
  onBack: (data: IFormData) => Promise<void>;
}

export declare interface IFormData {
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  role: string;
}

declare interface InputsProps extends InputInterface {
  pattern: RegExp;
}

const inputs: InputsProps[] = [
  {
    name: 'adminFirstName',
    label: 'First name',
    pattern: /.{2,}/,
  },
  {
    name: 'adminLastName',
    label: 'Last name',
    pattern: /.{2,}/,
  },
  {
    name: 'adminEmail',
    label: 'Email',
    pattern: /.+@.+\..*/,
  },
  {
    name: 'adminPassword',
    label: 'Password',
    pattern: /.+/,
  },
  {
    name: 'role',
    label: 'Role',
    pattern: /Admin/,
  },
];

const AdminForm = ({
  initialState,
  onSubmit,
  onBack,
}: IAdminForm): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, _, __, register, submit] = useFormData<any>({
    initialState,
    onSubmit,
  });

  return (
    <>
      <h2 className="text-2xl font-semibold text-brand-blue-dark mb-7">
        {constant.FORM_TITLE}
      </h2>
      <div className="flex-1">
        {inputs.map(({ name, label, pattern }) => (
          <Input
            key={name}
            {...register(name, { required: false, pattern })}
            placeholder=""
            label={label}
            size="sm"
            labelPosition="left"
            hasLabel
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="ghost"
          text="Back"
          margin="left"
          onClick={async () => await onBack(formData)}
        />
        <Button text="Next" onClick={submit} />
      </div>
    </>
  );
};

export default AdminForm;
