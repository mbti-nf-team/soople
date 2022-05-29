import { ComponentMeta, ComponentStory } from '@storybook/react';

import SelectBox from './SelectBox';

const styles = {
  transform: 'scale(1)',
  height: '30vh',
};

export default {
  title: 'Components/SelectBox',
  component: SelectBox,
  argTypes: {},
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = (
  args: any,
) => <SelectBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: '1',
  options: [
    { value: 'orange', label: 'orange' },
    { value: 'banana', label: 'banana' },
    { value: 'apple', label: 'apple' },
  ],
  labelText: '과일',
  helperMessage: '맛있는 과일',
  labelOptionText: '선택',
  placeholder: '선택해주세요.',
};

export const Medium = Template.bind({});

Medium.args = {
  id: '1',
  options: [
    { value: 'orange', label: 'orange' },
    { value: 'banana', label: 'banana' },
    { value: 'apple', label: 'apple' },
  ],
  labelText: '과일',
  size: 'medium',
};

export const Small = Template.bind({});

Small.args = {
  id: '1',
  options: [
    { value: 'orange', label: 'orange' },
    { value: 'banana', label: 'banana' },
    { value: 'apple', label: 'apple' },
  ],
  labelText: '과일',
  size: 'small',
};
