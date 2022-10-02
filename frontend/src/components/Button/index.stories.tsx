import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button, { ButtonInterface } from '.';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: ButtonInterface) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {text: "Getting start", primary: true, onClick: () => {alert('object');}};

export const Secondary = Template.bind({});
Secondary.args = {...Primary.args, primary: false};
