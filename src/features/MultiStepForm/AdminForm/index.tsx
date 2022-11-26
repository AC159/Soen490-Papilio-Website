
import type { InputInterface } from '..';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useFormData, { IErrorTemplate } from '../../../hooks/useFormData';
import * as constant from './constant';

export declare interface IAdminForm {
  initialState: IFormData
  onSubmit: (data: IFormData) => Promise<void>
  onBack: (data: IFormData) => Promise<void>
}

export declare interface IFormData {
  adminName: string
  adminEmail: string
  adminPassword: string
  role: string
}

const inputs: InputInterface[] = [
  {
    name: 'adminName',
    label: 'Name',
  },
  {
    name: 'adminEmail',
    label: 'Email',
  },
  {
    name: 'adminPassword',
    label: 'Password',
  },
  {
    name: 'role',
    label: 'Role',
  },
];

const errorTemplate: IErrorTemplate = {};

const AdminForm = ({ initialState, onSubmit, onBack }: IAdminForm): JSX.Element => {
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
      <div className='flex justify-between items-center mt-6'>
        <Button
          variant='ghost'
          text='Back'
          margin='left'
          onClick={async () => await onBack(formData)}
        />
        <Button
          text="Next"
          onClick={submit}
        />
      </div>
    </>
  );
};

export default AdminForm;
