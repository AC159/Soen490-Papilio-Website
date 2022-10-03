import { ComponentMeta, ComponentStory } from '@storybook/react';

import Tab, { TabInterface } from '.';

export default {
  title: 'Components/Tab',
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args: TabInterface) => (<div className='w-3/12'><Tab {...args} /></div>);

export const VerticalTab = Template.bind({});
VerticalTab.args = {
  label: 'Employees',
  isSelected: true,
  icon: 'ad',
};

export const HorizontalTab = Template.bind({});
HorizontalTab.args = {
  ...VerticalTab.args,
  horizontal: true,
  icon: undefined,
};
