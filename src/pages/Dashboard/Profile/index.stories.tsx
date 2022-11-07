import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileDashboard from './';

export default {
  title: 'Page/Dashboard/Profile',
  component: ProfileDashboard,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ProfileDashboard>;

const Template: ComponentStory<typeof ProfileDashboard> = () => <ProfileDashboard />;

export const Basic = Template.bind({});
Basic.args = {};
