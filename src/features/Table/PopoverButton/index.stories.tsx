import { ComponentMeta, ComponentStory } from '@storybook/react';

import PopoverButton, { IPopoverButton } from '.';

export default {
  title: 'Features/Table/PopoverButton',
  component: PopoverButton,
} as ComponentMeta<typeof PopoverButton>;

const Template: ComponentStory<typeof PopoverButton> = (args: IPopoverButton) => (
  <div className='h-screen'>
    <PopoverButton {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {

};
