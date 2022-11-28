import { ComponentMeta, ComponentStory } from '@storybook/react';

import Select, { SelectInterface } from '.';

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args: SelectInterface) => <Select {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  name: 'basic',
};
