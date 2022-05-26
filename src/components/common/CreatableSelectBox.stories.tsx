import { ComponentMeta, ComponentStory } from '@storybook/react';

import CreatableSelectBox from './CreatableSelectBox';

const styles = {
  transform: 'scale(1)',
  height: '30vh',
};

export default {
  title: 'Components/Common/CreatableSelectBox',
  component: CreatableSelectBox,
  argTypes: {},
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as ComponentMeta<typeof CreatableSelectBox>;

const Template: ComponentStory<typeof CreatableSelectBox> = (
  args: any,
) => <CreatableSelectBox {...args} />;

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
  errorMessage: '과일을 선택해주세요.',
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
