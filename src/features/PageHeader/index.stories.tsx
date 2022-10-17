import { ComponentMeta, ComponentStory } from '@storybook/react';

import PageHeader, { PageHeaderInterface } from '.';

export default {
  title: 'Features/PageHeader',
  component: PageHeader,
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args: PageHeaderInterface) => (
  <div className='border h-screen'>
    <PageHeader {...args} />
  </div>
);

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
  header: 'Employees',
  subtitle: 'Manage, control, and give access',
};

export const WithoutSubtitle = Template.bind({});
WithoutSubtitle.args = {
  ...WithSubtitle.args,
  subtitle: undefined,
};
