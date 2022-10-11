import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddForm, { AddFormInterface } from './';

export default {
  title: 'Page/Dashboard/Employee/AddForm',
  component: AddForm,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof AddForm>;

const Template: ComponentStory<typeof AddForm> = (args: AddFormInterface) => <AddForm {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  onSubmit: (data) => { alert(data); },
};
