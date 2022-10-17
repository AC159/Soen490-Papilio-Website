import { ComponentMeta, ComponentStory } from '@storybook/react';

import BoxForm, { BoxFormInterface } from '.';
import Input from '../../components/Input';

export default {
  title: 'Features/BoxForm',
  component: BoxForm,
} as ComponentMeta<typeof BoxForm>;

const Template: ComponentStory<typeof BoxForm> = (args: BoxFormInterface) => <BoxForm {...args} />;

export const FormCard = Template.bind({});
FormCard.args = {
  heading: "Let's create your business root administrator account",
  buttonText: 'Create account',
  hasBack: true,
  children: (
    <>
      <Input name='' value='1' placeholder='Administrator full name' label='Full name' onChange={() => {}} hasLabel/>
      <Input name='' value='' placeholder='Administrator email' label='Email' onChange={() => {}} hasLabel/>
      <Input name='' value='' placeholder='Administrator password' label='Password' onChange={() => {}} hasLabel/>
    </>
  ),
};

export const FormCardNoBack = Template.bind({});
FormCardNoBack.args = {
  ...FormCard.args,
  hasBack: false,
  heading: 'How would you like to name your business?',
  buttonText: 'Create business',
  children: (
    <>
      <Input name='' value={''} placeholder='Insert your business ID' onChange={() => {}} />
    </>
  ),
};
