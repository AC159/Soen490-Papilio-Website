import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import useFormData from '../../../../hooks/useFormData';
import UploadImage from '../UploadImage';
import * as constant from './constant';

export declare interface AddFormInterface {
  onSubmit: (data: IFormData) => Promise<void>;
}

export declare interface IFormData {
  title: string;
  address: string;
  startTime: string;
  endTime: string;
  description: string;
  costPerIndividual: number;
  costPerGroup: number;
  groupSize: number;
  image?: null;
}

const initialState: IFormData = {
  title: '',
  address: '',
  startTime: '',
  endTime: '',
  description: '',
  costPerIndividual: 0,
  costPerGroup: 0,
  groupSize: 0,
  image: null,
};

const AddForm = ({ onSubmit }: AddFormInterface): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused1, _unused2, _unused3, register, submit] =
    useFormData<IFormData>({ initialState, onSubmit });

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">{constant.FORM_HEADLINE}</h2>
      <Input
        {...register(constant.INPUT_TITLE, {
          required: false,
          pattern: /.*/,
        })}
        placeholder={constant.INPUT_TITLE_PLACEHOLDER}
        label={constant.INPUT_TITLE_LABEL}
        hasLabel
      />
      <Input
        {...register(constant.INPUT_ADDRESS, {
          required: false,
          pattern: /.*/,
        })}
        placeholder={constant.INPUT_ADDRESS_PLACEHOLDER}
        label={constant.INPUT_ADDRESS_LABEL}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            {...register(constant.INPUT_STARTTIME, {
              required: false,
              pattern: /.*/,
            })}
            placeholder={constant.INPUT_STARTTIME_PLACEHOLDER}
            label={constant.INPUT_STARTTIME_LABEL}
            hasLabel
          />
        </div>
        <div>
          <Input
            {...register(constant.INPUT_ENDTIME, {
              required: false,
              pattern: /.*/,
            })}
            placeholder={constant.INPUT_ENDTIME_PLACEHOLDER}
            label={constant.INPUT_ENDTIME_LABEL}
            hasLabel
          />
        </div>
      </div>
      <Input
        {...register(constant.INPUT_DESCRIPTION, {
          required: false,
          pattern: /.*/,
        })}
        placeholder={constant.INPUT_DESCRIPTION_PLACEHOLDER}
        label={constant.INPUT_DESCRIPTION_LABEL}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            {...register(constant.INPUT_COST_PER_INDV, {
              required: false,
              pattern: /.*/,
            })}
            placeholder={constant.INPUT_COST_PER_INDV_PLACEHOLDER}
            label={constant.INPUT_COST_PER_INDV_LABEL}
            hasLabel
          />
        </div>
        <div className='pr-10'>
          <Input
            {...register(constant.INPUT_COST_PER_GRP, {
              required: false,
              pattern: /.*/,
            })}
            placeholder={constant.INPUT_COST_PER_GRP_PLACEHOLDER}
            label={constant.INPUT_COST_PER_GRP_LABEL}
            hasLabel
          />
        </div>
        <div>
          <Input
            {...register(constant.INPUT_GROUP_SIZE, {
              required: false,
              pattern: /.*/,
            })}
            placeholder={constant.INPUT_GROUP_SIZE_PLACEHOLDER}
            label={constant.INPUT_GROUP_SIZE_LABEL}
            hasLabel
          />
        </div>
      </div>
      <UploadImage/>
      <br/>
      <Button text={constant.BUTTON_TEXT} onClick={submit} />
    </div>
  );
};

export default AddForm;
