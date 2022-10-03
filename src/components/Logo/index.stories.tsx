import { ComponentMeta, ComponentStory } from '@storybook/react';

import Logo, { LogoInterface } from '.';

export default {
  title: 'Components/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args: LogoInterface) => (
  <>
    <Logo {...args} size='lg'/>
    <Logo {...args} size='md'/>
    <Logo {...args} size='sm'/>
  </>
);

export const LogoOnly = Template.bind({});
LogoOnly.args = { hasText: false };

export const LogoText = Template.bind({});
LogoText.args = { ...LogoOnly, hasText: true };
