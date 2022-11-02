import { ComponentMeta, ComponentStory } from '@storybook/react';

import MultiStepForm, { IMultiStepForm, Progress, Step } from '.';

export default {
  title: 'Features/MultiStepForm',
  component: MultiStepForm,
} as ComponentMeta<typeof MultiStepForm>;

const Template: ComponentStory<typeof MultiStepForm> = (args: IMultiStepForm) => (
  <div className='border h-screen flex justify-center items-center'>
    <MultiStepForm {...args}/>
  </div>
);

const progress: Progress[] = [
  {
    icon: 'feed',
    text: 'Business profile',
  },
  {
    icon: 'admin_panel_settings',
    text: 'Root accout',
  },
  {
    icon: 'done_all',
    text: 'Validation',
  },
];

const steps: Step[] = [
  {
    stepId: 'profile',
    caption: "Let's create your business profile",
    last: false,
  },
  {
    stepId: 'adminAccount',
    caption: "Let's create your main account",
    last: false,
  },
  {
    stepId: 'validation',
    // title: 'Your business is being created',
    caption: "Let's create your business",
    last: true,
  },
];

export const Basic = Template.bind({});
Basic.args = {
  steps,
  progress,
  onSubmit: async (): Promise<void> => { console.log('data'); },
};
