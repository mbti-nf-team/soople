import { ComponentMeta, ComponentStory } from '@storybook/react';

import Textarea from './Textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    id: {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    message: {
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'text',
      },
    },
    labelText: {
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'text',
      },
    },
    labelOptionText: {
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'text',
      },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    readOnly: {
      table: {
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    isError: {
      table: {
        type: { summary: 'boolean' },
      },
      control: { type: 'boolean' },
    },
    value: {
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      table: {
        type: { summary: 'React.ChangeEventHandler<HTMLTextAreaElement>' },
      },
    },
    height: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '72px' },
      },
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args: any) => <Textarea {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: '1',
  labelText: 'label',
  placeholder: '입력해주세요.',
  labelOptionText: '',
  disabled: false,
  readOnly: false,
  isError: false,
};

export const HasOptionLabelText = Template.bind({});

HasOptionLabelText.args = {
  id: '1',
  labelText: 'label',
  placeholder: '입력해주세요.',
  labelOptionText: 'option',
  message: '',
  disabled: false,
  readOnly: false,
  isError: false,
};

export const HasMessage = Template.bind({});

HasMessage.args = {
  id: '1',
  labelText: 'label',
  placeholder: '입력해주세요.',
  labelOptionText: '',
  message: 'helper message.',
  disabled: false,
  readOnly: false,
  isError: false,
};

export const HasError = Template.bind({});

HasError.args = {
  id: '1',
  labelText: 'label',
  placeholder: '입력해주세요.',
  labelOptionText: '',
  message: 'error message.',
  disabled: false,
  readOnly: false,
  isError: true,
};
