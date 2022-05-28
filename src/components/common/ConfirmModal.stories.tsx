import { ComponentMeta, ComponentStory } from '@storybook/react';

import ConfirmModal from './ConfirmModal';

const styles = {
  transform: 'scale(1)',
  height: '100vh',
};

export default {
  title: 'Components/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    isVisible: {
      control: { type: 'boolean' },
    },
  },
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as ComponentMeta<typeof ConfirmModal>;

const Template: ComponentStory<typeof ConfirmModal> = (args: any) => <ConfirmModal {...args} />;

export const Default = Template.bind({});

Default.args = {
  isVisible: true,
  title: '제목',
  description: '내용',
  confirmText: '확인',
  closeText: '닫기',
};

export const Warning = Template.bind({});

Warning.args = {
  isVisible: true,
  title: '제목',
  description: '내용',
  confirmText: '확인',
  closeText: '닫기',
  confirmButtonColor: 'warning',
};
