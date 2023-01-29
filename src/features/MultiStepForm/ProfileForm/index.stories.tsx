import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfileForm, { IProfileForm } from '.';

export default {
  title: 'Features/MultiStepForm/ProfileForm',
  component: ProfileForm,
} as ComponentMeta<typeof ProfileForm>;

const Template: ComponentStory<typeof ProfileForm> = (args: IProfileForm) => (
  <div className="border h-screen flex items-center flex-col">
    <ProfileForm {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  onSubmit: async () => {},
  initialState: {
    businessName: '',
    email: '',
    addressLineOne: '',
    addressLineTwo: '',
    postalCode: '',
    city: '',
    country: '',
    province: '',
  },
};
