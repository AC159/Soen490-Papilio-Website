import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginPage, { ILoginPage } from './';

export default {
  title: 'Page/Login',
  component: LoginPage,
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args: ILoginPage) => <LoginPage {...args} />;

export const BusinessCreation = Template.bind({});
BusinessCreation.args = {
  type: 'business',
};

export const AdminCreation = Template.bind({});
AdminCreation.args = {
  ...BusinessCreation.args,
  type: 'businessLogic',
};

export const LoginCreation = Template.bind({});
LoginCreation.args = {
  ...BusinessCreation.args,
  type: 'login',
};
