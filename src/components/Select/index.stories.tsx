import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Select, { SelectInterface } from '.';
import { Select as SimplerSelect } from './other/Select';

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const StateWrapper = ({ children }: { children: any }): JSX.Element => {
  const [value, setValue] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setValue(event.target.value);
  const onSelect = (event: React.ChangeEvent<HTMLOptionElement>): void => {
    setValue(event.target.value);
  };

  return children(value, onChange, onSelect);
};

const Template: ComponentStory<typeof Select> = (args: SelectInterface) => (
  <>
    <Select {...args} />
    <StateWrapper>
      {/* @ts-expect-error */}
      {(value, onChange, onSelect) => (
        <SimplerSelect
          label="Select"
          options={[{ value: 'a' }, { value: 'b' }]}
          value={value}
          onChange={onChange}
          onOptionClick={onSelect}
        />
      )}
    </StateWrapper>
  </>
);

export const Basic = Template.bind({});
Basic.args = {
  value: '',
  name: 'basic',
  onChange: () => {},
  items: [
    {
      value: 'Jack jhon',
      display: 'Jack jhon',
      type: 'basic',
    },
    {
      value: 'Alfred Wayne',
      display: 'Alfred Wayne',
      type: 'basic',
    },
    {
      value: 'Bob Dalaire',
      display: 'Bob Dalaire',
      type: 'basic',
    },
  ],
};
