import { ComponentMeta, ComponentStory } from '@storybook/react';

import SearchBar, { ISearchBar } from '.';

export default {
  title: 'Features/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args: ISearchBar) => (
  <>
    <SearchBar {...args} size='lg'/>
    <br />
    <SearchBar {...args} size='md'/>
    <br />
    <SearchBar {...args} size='sm'/>
  </>);

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Search employee',
};
