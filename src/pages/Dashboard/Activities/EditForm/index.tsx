import { useState } from 'react';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { Activity } from '../Table';
import UploadImage from '../UploadImage';
import * as constant from './constant';

export declare interface EditInterface {
  activity: Activity;
  onSubmit: (activityId: string, data: Activity) => Promise<void>;
}

const EditForm = ({ activity, onSubmit }: EditInterface): JSX.Element => {
  const [inputValue, setInputValue] = useState(
    {
      id: activity.id,
      title: activity.title,
      address: activity.address,
      startTime: activity.startTime,
      endTime: activity.endTime,
      description: activity.description,
      costPerIndividual: activity.costPerIndividual,
      costPerGroup: activity.costPerGroup,
      groupSize: activity.groupSize,
    },
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
    console.log(inputValue);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4.5">{constant.FORM_HEADLINE}</h2>
      <Input
        name={constant.INPUT_TITLE}
        onChange={handleOnChange}
        value={inputValue.title}
        placeholder={constant.INPUT_TITLE_PLACEHOLDER}
        label={constant.INPUT_TITLE_LABEL}
        hasLabel
      />
      <Input
        name={constant.INPUT_ADDRESS}
        onChange={handleOnChange}
        value={inputValue.address}
        placeholder={constant.INPUT_ADDRESS_PLACEHOLDER}
        label={constant.INPUT_ADDRESS_LABEL}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            name={constant.INPUT_STARTTIME}
            onChange={handleOnChange}
            value={inputValue.startTime}
            placeholder={constant.INPUT_STARTTIME_PLACEHOLDER}
            label={constant.INPUT_STARTTIME_LABEL}
            hasLabel
          />
        </div>
        <div>
          <Input
            name={constant.INPUT_ENDTIME}
            onChange={handleOnChange}
            value={inputValue.endTime}
            placeholder={constant.INPUT_ENDTIME_PLACEHOLDER}
            label={constant.INPUT_ENDTIME_LABEL}
            hasLabel
          />
        </div>
      </div>
      <Input
        name={constant.INPUT_DESCRIPTION}
        onChange={handleOnChange}
        value={inputValue.description}
        placeholder={constant.INPUT_DESCRIPTION_PLACEHOLDER}
        label={constant.INPUT_DESCRIPTION_LABEL}
        hasLabel
      />
      <div className='flex'>
        <div className='pr-10'>
          <Input
            name={constant.INPUT_COST_PER_INDV}
            onChange={handleOnChange}
            value={inputValue.costPerIndividual}
            placeholder={constant.INPUT_COST_PER_INDV_PLACEHOLDER}
            label={constant.INPUT_COST_PER_INDV_LABEL}
            hasLabel
          />
        </div>
        <div className='pr-10'>
          <Input
            name={constant.INPUT_COST_PER_GRP}
            onChange={handleOnChange}
            value={inputValue.costPerGroup}
            placeholder={constant.INPUT_COST_PER_GRP_PLACEHOLDER}
            label={constant.INPUT_COST_PER_GRP_LABEL}
            hasLabel
          />
        </div>
        <div>
          <Input
            name={constant.INPUT_GROUP_SIZE}
            onChange={handleOnChange}
            value={inputValue.groupSize}
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
        onClick={async () => await onSubmit(activity.id, inputValue)}
      />
    </div>
  );
};

export default EditForm;
