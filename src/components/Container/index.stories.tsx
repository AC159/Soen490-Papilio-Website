import { ComponentMeta, ComponentStory } from '@storybook/react';

import Container, { ContainerInterface } from '.';

export default {
  title: 'Components/Container',
  component: Container,
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args: ContainerInterface) => <Container {...args} />;

export const FullVertical = Template.bind({});
FullVertical.args = {
  children: <div>hello</div>,
  border: 'all',
};

export const FullHorizontal = Template.bind({});
FullHorizontal.args = {
  ...FullVertical.args,
};

export const BorderBottomOnly = Template.bind({});
BorderBottomOnly.args = {
  ...FullVertical.args,
  border: 'bottom',
};

export const BorderRightOnly = Template.bind({});
BorderRightOnly.args = {
  ...FullVertical.args,
  border: 'right',
};

export const BorderLeftOnly = Template.bind({});
BorderLeftOnly.args = {
  ...FullVertical.args,
  border: 'left',
};

export const BorderTopOnly = Template.bind({});
BorderTopOnly.args = {
  ...FullVertical.args,
  border: 'top',
};

export const AllBorder = Template.bind({});
AllBorder.args = {
  ...FullVertical.args,
  border: 'all',
};

export const NoBorder = Template.bind({});
NoBorder.args = {
  ...FullVertical.args,
  border: 'none',
};
