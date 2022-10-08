import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button, { ButtonInterface } from '.';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonInterface) => (
  <>
    <Button {...args} size='lg' />
    <br/>
    <Button {...args} size='md' />
    <br/>
    <Button {...args} size='sm' />
  </>
);

export const Primary = Template.bind({});
Primary.args = { text: 'Getting start', onClick: () => { alert('object'); } };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, variant: 'secondary' };

export const Outline = Template.bind({});
Outline.args = { ...Primary.args, variant: 'outline' };
