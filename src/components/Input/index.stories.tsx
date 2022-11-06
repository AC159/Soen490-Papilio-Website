import { ComponentMeta, ComponentStory } from '@storybook/react';

import Input, { InputInterface } from '.';

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: InputInterface) => <Input {...args} />;

export const InputWithLabel = Template.bind({});
InputWithLabel.args = {
  placeholder: 'Administrator full name',
  label: 'Full name',
  hasLabel: true,
};

export const InputNoLabel = Template.bind({});
InputNoLabel.args = { ...InputWithLabel.args, hasLabel: false };

export const GhostInput = Template.bind({});
GhostInput.args = {
  ...InputWithLabel.args,
  variant: 'ghost',
};
