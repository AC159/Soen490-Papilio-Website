import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon, { IconInterface, IconNames } from '.';

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args: IconInterface) => (
  <>
    <Icon {...args} size='lg' />
    <br/>
    <Icon {...args} size='md' />
    <br/>
    <Icon {...args} size='sm' />
  </>
);

export const Primary = Template.bind({});
Primary.args = { name: IconNames.EMPLOYEE };
