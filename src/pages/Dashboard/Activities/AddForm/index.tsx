import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import useFormData, { IErrorTemplate } from '../../../../hooks/useFormData';
import * as constant from './constant';
import UploadImage from '../UploadImage';

export declare interface AddFormInterface {
  onSubmit: (data: IFormData) => Promise<void>
}

export declare interface IFormData {
  activityTitle: string
  activityLocation: string
  activityDescription: string
  activityStart: string
  activityEnd: string
  activityCostIndv: string
  activityGroupSize: string
  activityCostGroup: string
  activityImage: string
};

const initialState: IFormData = {
  activityTitle: '',
  activityLocation: '',
  activityDescription: '',
  activityStart: '',
  activityEnd: '',
  activityCostIndv: '',
  activityGroupSize: '',
  activityCostGroup: '',
  activityImage: '',
};

const errorTemplate: IErrorTemplate = {};

const AddForm = ({ onSubmit }: AddFormInterface): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, _, __, onValueChange, submit] = useFormData<IFormData>({ initialState, errorTemplate, onSubmit });

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">{constant.FORM_HEADLINE}</h2>
      <Input
        name={constant.INPUT_ACTIVITY_TITLE}
        value={formData.activityTitle}
        placeholder={constant.INPUT_ACTIVITY_TITLE_PLACEHOLDER}
        label={constant.INPUT_ACTIVITY_TITLE_LABEL}
        onChange={onValueChange}
        hasLabel
      />
      <Input
        name={constant.INPUT_ACTIVITY_LOCATION}
        value={formData.activityLocation}
        placeholder={constant.INPUT_ACTIVITY_LOCATION_PLACEHOLDER}
        label={constant.INPUT_ACTIVITY_LOCATION_LABEL}
        onChange={onValueChange}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            name={constant.INPUT_ACTIVITY_START}
            value={formData.activityStart}
            placeholder={constant.INPUT_ACTIVITY_START_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_START_LABEL}
            onChange={onValueChange}
            hasLabel
          />
        </div>
        <div>
          <Input
            name={constant.INPUT_ACTIVITY_END}
            value={formData.activityEnd}
            placeholder={constant.INPUT_ACTIVITY_END_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_END_LABEL}
            onChange={onValueChange}
            hasLabel
          />
        </div>
      </div>
      <Input
        name={constant.INPUT_ACTIVITY_DESCRIPTION}
        value={formData.activityDescription}
        placeholder={constant.INPUT_ACTIVITY_DESCRIPTION_PLACEHOLDER}
        label={constant.INPUT_ACTIVITY_DESCRIPTION_LABEL}
        onChange={onValueChange}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            name={constant.INPUT_ACTIVITY_COST_INDV}
            value={formData.activityCostIndv}
            placeholder={constant.INPUT_ACTIVITY_COST_INDV_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_COST_INDV_LABEL}
            onChange={onValueChange}
            hasLabel
          />
        </div>
        <div className='pr-10'>
        <Input
            name={constant.INPUT_ACTIVITY_COST_GROUP}
            value={formData.activityCostGroup}
            placeholder={constant.INPUT_ACTIVITY_COST_GROUP_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_COST_GROUP_LABEL}
            onChange={onValueChange}
            hasLabel
          />
        </div>
        <div>
        <Input
            name={constant.INPUT_ACTIVITY_GROUP}
            value={formData.activityGroupSize}
            placeholder={constant.INPUT_ACTIVITY_GROUP_PLACEHOLDER}
            label={constant.INPUT_ACTIVITY_GROUP_LABEL}
            onChange={onValueChange}
            hasLabel
          />
        </div>
      </div>
      {/* TODO: Add value for image */}
      <UploadImage/>
      <br></br>
      <Button text={constant.BUTTON_TEXT} onClick={submit}/>
    </div>
  );
};

export default AddForm;
