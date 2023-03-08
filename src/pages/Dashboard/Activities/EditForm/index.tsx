import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { Activity } from '../Table';
import UploadImage from '../UploadImage';
import * as constant from './constant';

export declare interface EditInterface {
  activity: Activity;
  onSubmit: (data: Activity) => Promise<void>;
}

const EditForm = ({ activity, onSubmit }: EditInterface): JSX.Element => {
  const handleOnChange = (): void => {
    console.log('IN ON CHANGE');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">{constant.FORM_HEADLINE}</h2>
      <Input
        name={constant.INPUT_TITLE}
        onChange={handleOnChange}
        value={activity.title}
        placeholder={constant.INPUT_TITLE_PLACEHOLDER}
        label={constant.INPUT_TITLE_LABEL}
        hasLabel
      />
      <Input
        name={constant.INPUT_ADDRESS}
        onChange={handleOnChange}
        value={activity.address}
        placeholder={constant.INPUT_ADDRESS_PLACEHOLDER}
        label={constant.INPUT_ADDRESS_LABEL}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            name={constant.INPUT_STARTTIME}
            onChange={handleOnChange}
            value={activity.startTime}
            placeholder={constant.INPUT_STARTTIME_PLACEHOLDER}
            label={constant.INPUT_STARTTIME_LABEL}
            hasLabel
          />
        </div>
        <div>
          <Input
            name={constant.INPUT_ENDTIME}
            onChange={handleOnChange}
            value={activity.endTime}
            placeholder={constant.INPUT_ENDTIME_PLACEHOLDER}
            label={constant.INPUT_ENDTIME_LABEL}
            hasLabel
          />
        </div>
      </div>
      <Input
        name={constant.INPUT_DESCRIPTION}
        onChange={handleOnChange}
        value={activity.description}
        placeholder={constant.INPUT_DESCRIPTION_PLACEHOLDER}
        label={constant.INPUT_DESCRIPTION_LABEL}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            name={constant.INPUT_COST_PER_INDV}
            onChange={handleOnChange}
            value={activity.costPerIndividual}
            placeholder={constant.INPUT_COST_PER_INDV_PLACEHOLDER}
            label={constant.INPUT_COST_PER_INDV_LABEL}
            hasLabel
          />
        </div>
        <div className='pr-10'>
          <Input
            name={constant.INPUT_COST_PER_GRP}
            onChange={handleOnChange}
            value={activity.costPerGroup}
            placeholder={constant.INPUT_COST_PER_GRP_PLACEHOLDER}
            label={constant.INPUT_COST_PER_GRP_LABEL}
            hasLabel
          />
        </div>
        <div>
          <Input
            name={constant.INPUT_GROUP_SIZE}
            onChange={handleOnChange}
            value={activity.groupSize}
            placeholder={constant.INPUT_GROUP_SIZE_PLACEHOLDER}
            label={constant.INPUT_GROUP_SIZE_LABEL}
            hasLabel
          />
        </div>
      </div>
      <UploadImage/>
      <br/>
      <Button
        text={constant.BUTTON_TEXT}
        onClick={async () => await onSubmit(activity)}
      />
    </div>
  );
};

export default EditForm;
