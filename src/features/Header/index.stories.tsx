import { ComponentMeta, ComponentStory } from '@storybook/react';

import Header from '.';

export default {
  title: 'Features/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Primary = Template.bind({});
Primary.args = {};
