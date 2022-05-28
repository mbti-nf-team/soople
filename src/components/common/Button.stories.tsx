import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    color: {
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: '버튼',
  color: 'outlined',
  size: 'medium',
  disabled: false,
};

export const Success = Template.bind({});

Success.args = {
  children: '버튼',
  color: 'success',
};

export const Primary = Template.bind({});

Primary.args = {
  children: '버튼',
  color: 'primary',
};

export const Warning = Template.bind({});

Warning.args = {
  children: '버튼',
  color: 'warning',
};

export const Ghost = Template.bind({});

Ghost.args = {
  children: '버튼',
  color: 'ghost',
};

export const Disabled = Template.bind({});

Disabled.args = {
  children: '버튼',
  disabled: true,
};

export const Large = Template.bind({});

Large.args = {
  children: '버튼',
  size: 'large',
};

export const Small = Template.bind({});

Small.args = {
  children: '버튼',
  size: 'small',
};
