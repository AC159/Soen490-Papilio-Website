import { ComponentMeta, ComponentStory } from '@storybook/react';

import ListBanner, { ListBannerInterface } from '.';
import Button from '../../components/Button';
import { ITab } from '../TabList';

export default {
  title: 'Features/ListBanner',
  component: ListBanner,
} as ComponentMeta<typeof ListBanner>;

const Template: ComponentStory<typeof ListBanner> = (args: ListBannerInterface) => (
  <div className='border h-screen'>
    <ListBanner {...args} />
  </div>
);

const tabs: ITab[] = [
  { label: 'All employees' },
  { label: 'Admin' },
  { label: 'Normal' },
];

export const Basic = Template.bind({});
Basic.args = {
  tabs,
};

export const WithRightHandSide = Template.bind({});
WithRightHandSide.args = {
  ...Basic.args,
  rhs: (
    <Button text='Add employee' primary={false} onClick={() => {}}/>
  ),
};
