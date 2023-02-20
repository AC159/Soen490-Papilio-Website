import { ComponentStory, ComponentMeta } from '@storybook/react';

import EmployeeDashboard from './';

export default {
  title: 'Page/Dashboard/Activities',
  component: EmployeeDashboard,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof EmployeeDashboard>;

const Template: ComponentStory<typeof EmployeeDashboard> = () => <EmployeeDashboard />;

export const Basic = Template.bind({});
Basic.args = {};
