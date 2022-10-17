import { ComponentMeta, ComponentStory } from '@storybook/react';

import SideMenu from '.';

export default {
  title: 'Features/SideMenu',
  component: SideMenu,
} as ComponentMeta<typeof SideMenu>;

const Template: ComponentStory<typeof SideMenu> = () => (
  <div className='border h-screen'>
    <SideMenu />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
};
