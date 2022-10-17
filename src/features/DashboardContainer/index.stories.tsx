import { ComponentMeta, ComponentStory } from '@storybook/react';

import DashboardContainer, { IDashboardContainer } from '.';

export default {
  title: 'Features/DashboardContainer',
  component: DashboardContainer,
} as ComponentMeta<typeof DashboardContainer>;

const Template: ComponentStory<typeof DashboardContainer> = (args: IDashboardContainer) => (
  <div className='border w-screen'>
    <DashboardContainer {...args}>
      {args.children}
    </DashboardContainer>
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
};
