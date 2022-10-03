import { ComponentMeta, ComponentStory } from '@storybook/react';

import SideMenu, { SideMenuInterface } from '.';

export default {
  title: 'Features/SideMenu',
  component: SideMenu,
} as ComponentMeta<typeof SideMenu>;

const Template: ComponentStory<typeof SideMenu> = (args: SideMenuInterface) => (
  <div className='border h-screen'>
    <SideMenu {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
};
