import { ComponentMeta, ComponentStory } from '@storybook/react';

import TabList, { TabListInterface, ITab } from '.';

export default {
  title: 'Features/TabList',
  component: TabList,
} as ComponentMeta<typeof TabList>;

const Template: ComponentStory<typeof TabList> = (args: TabListInterface) => <TabList {...args} />;

export const VerticalTabs = Template.bind({});
const tabs: ITab[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Event manager', icon: 'event' },
  { label: 'Ad center', icon: 'ad' },
  { label: 'Employees', icon: 'employee' },
];
VerticalTabs.args = {
  tabs,
};

export const HorizontalTabs = Template.bind({});
const HTabs: ITab[] = [
  { label: 'All employees' },
  { label: 'Admin' },
  { label: 'Normal' },
];
HorizontalTabs.args = {
  ...VerticalTabs.args,
  tabs: HTabs,
  horizontal: true,
};
