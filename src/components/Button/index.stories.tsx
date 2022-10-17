import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button, { ButtonInterface } from '.';
import { IconNames } from '../Icon';

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

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  ...Primary.args,
  icon: IconNames.SEARCH,
  hasIcon: true,
  margin: 'right',
};

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, variant: 'secondary' };

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
  ...Secondary.args,
  variant: 'secondary',
  icon: IconNames.SEARCH,
  hasIcon: true,
  margin: 'left',
  iconPosition: 'lhs',
};

export const Outline = Template.bind({});
Outline.args = { ...Primary.args, variant: 'outline' };

export const Ghost = Template.bind({});
Ghost.args = {
  ...Primary.args,
  variant: 'ghost',
  hasText: false,
  hasIcon: true,
  icon: IconNames.SEARCH,
  iconSize: 'lg',
};
