import { ComponentMeta, ComponentStory } from '@storybook/react';

import FormModal from './FormModal';

const styles = {
  transform: 'scale(1)',
  height: '100vh',
};

export default {
  title: 'Components/FormModal',
  component: FormModal,
  argTypes: {
    isVisible: {
      control: { type: 'boolean' },
    },
  },
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as ComponentMeta<typeof FormModal>;

const Template: ComponentStory<typeof FormModal> = (args: any) => <FormModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  isVisible: true,
  title: '제목',
  confirmText: '확인',
  closeText: '닫기',
  size: '600px',
  confirmButtonColor: 'success',
  children: <div>children</div>,
};
