import { ComponentMeta, ComponentStory } from '@storybook/react';

import Row, { RowInterface } from '.';

export default {
  title: 'Features/Table/Row',
  component: Row,
} as ComponentMeta<typeof Row>;

const Template: ComponentStory<typeof Row> = (args: RowInterface) => (
  <div className='h-screen'>
    <Row {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  data: ['a', 'b', 'c'],
};
