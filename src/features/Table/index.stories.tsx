import { ComponentMeta, ComponentStory } from '@storybook/react';

import Table from '.';

export default {
  title: 'Features/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = () => (
  <div className="h-screen">
    <Table employees={[]} headerContent={[]} onSelect={() => {}} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
