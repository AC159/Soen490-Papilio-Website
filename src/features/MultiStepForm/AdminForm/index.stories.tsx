import { ComponentMeta, ComponentStory } from '@storybook/react';

import AdminForm, { IAdminForm } from '.';

export default {
  title: 'Features/MultiStepForm/ProfileForm',
  component: AdminForm,
} as ComponentMeta<typeof AdminForm>;

const Template: ComponentStory<typeof AdminForm> = (args: IAdminForm) => (
  <div className='border h-screen flex flex-col justify-center items-center'>
    <AdminForm {...args}/>
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  onSubmit: async () => {},
};
