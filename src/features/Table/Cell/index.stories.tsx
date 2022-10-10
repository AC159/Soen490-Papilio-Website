import { ComponentMeta, ComponentStory } from '@storybook/react';

import Cell, { CellInterface } from '.';

export default {
  title: 'Features/Table/Cell',
  component: Cell,
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args: CellInterface) => (
  <div className='h-screen'>
    <Cell {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  value: 'a',
};
