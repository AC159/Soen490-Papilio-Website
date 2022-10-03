import { ComponentMeta, ComponentStory } from '@storybook/react';

import DashboardContainer, { IDashboardContainer } from '.';
import { ITab } from '../TabList';

export default {
  title: 'Features/DashboardContainer',
  component: DashboardContainer,
} as ComponentMeta<typeof DashboardContainer>;

const Template: ComponentStory<typeof DashboardContainer> = (args: IDashboardContainer) => (
  <div className='border w-screen'>
    <DashboardContainer {...args}>
      {args.children}
    </DashboardContainer>
  </div>
);

const tabs: ITab[] = [
  { label: 'All employees' },
  { label: 'Admin' },
  { label: 'Normal' },
];

export const Basic = Template.bind({});
Basic.args = {
  header: 'Employees',
  subtitle: 'Manage, control and give acces',
};

export const WithTabsBanner = Template.bind({});
WithTabsBanner.args = {
  ...Basic.args,
  tabs,
};
