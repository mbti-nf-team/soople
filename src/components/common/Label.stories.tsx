import { ComponentMeta, ComponentStory } from '@storybook/react';

import Label from './Label';

export default {
  title: 'Components/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args: any) => <Label {...args} />;

export const Default = Template.bind({});

Default.args = {
  isError: false,
  labelText: 'label',
};

export const LabelWithOption = Template.bind({});

LabelWithOption.args = {
  isError: false,
  labelOptionText: 'option',
  labelText: 'label',
};

export const LabelWithError = Template.bind({});

LabelWithError.args = {
  isError: true,
  labelText: 'label',
};
