import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import SideMenu from '.';

export default {
  title: 'Features/SideMenu',
  component: SideMenu,
} as ComponentMeta<typeof SideMenu>;

const Template: ComponentStory<typeof SideMenu> = () => (
  <BrowserRouter>
    <div className='border h-screen'>
      <SideMenu />
    </div>
  </BrowserRouter>
);

export const Primary = Template.bind({});
Primary.args = {
};
