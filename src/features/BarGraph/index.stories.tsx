import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BarGraph } from '.';

export default {
  title: 'features/BarGraph',
  component: BarGraph,
} as ComponentMeta<typeof BarGraph>;

const Template: ComponentStory<typeof BarGraph> = (args: any) => (
  <BarGraph {...args} />
);

export const BasicBarGraph = Template.bind({});
