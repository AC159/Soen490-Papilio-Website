import { ComponentMeta, ComponentStory } from '@storybook/react';

import Row, { RowInterface } from '.';

export default {
  title: 'Features/Table/Row',
  component: Row,
} as ComponentMeta<typeof Row>;

const Template: ComponentStory<typeof Row> = (args: RowInterface) => (
  <div className='h-screen bg-brand-blue-dark'>
    <Row {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  id: 'row',
  data: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
};

export const Events = Template.bind({});
Events.args = {
  id: 'row',
  head: true,
  data: [
    { value: 'Event name' },
    { value: 'Created' },
    { value: 'Launched' },
    { value: 'Closed' },
    { value: 'State' },
  ],
};
