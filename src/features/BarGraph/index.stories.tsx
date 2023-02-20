import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BarGraph, BarGraphProps } from '.';
import { viewedActivity } from '../../fakeData';

export default {
  title: 'features/BarGraph',
  component: BarGraph,
} as ComponentMeta<typeof BarGraph>;

const Template: ComponentStory<typeof BarGraph> = (args: BarGraphProps) => (
  <BarGraph {...args} />
);

export const BasicBarGraph = Template.bind({});
BasicBarGraph.args = {
  data: viewedActivity,
  title: 'A graph title',
};
