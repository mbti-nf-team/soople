import { ComponentMeta, ComponentStory } from '@storybook/react';

import HelperMessage from './HelperMessage';

export default {
  title: 'Components/HelperMessage',
  component: HelperMessage,
} as ComponentMeta<typeof HelperMessage>;

const Template: ComponentStory<typeof HelperMessage> = (args: any) => <HelperMessage {...args} />;

export const Default = Template.bind({});

Default.args = {
  message: '에러가 발생했어요.',
};

export const ErrorMessage = Template.bind({});

ErrorMessage.args = {
  message: '에러가 발생했어요.',
  isError: true,
};
