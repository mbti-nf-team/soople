import { ComponentMeta, ComponentStory } from '@storybook/react';

import SwitchButton from './SwitchButton';

export default {
  title: 'Components/SwitchButton',
  component: SwitchButton,
} as ComponentMeta<typeof SwitchButton>;

const Template: ComponentStory<typeof SwitchButton> = (args: any) => <SwitchButton {...args} />;

export const Default = Template.bind({});
