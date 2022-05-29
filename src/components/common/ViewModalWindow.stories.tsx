import { ComponentMeta, ComponentStory } from '@storybook/react';

import ViewModalWindow from './ViewModalWindow';

const styles = {
  transform: 'scale(1)',
  height: '100vh',
};

export default {
  title: 'Components/ViewModalWindow',
  component: ViewModalWindow,
  argTypes: {
    isVisible: {
      control: { type: 'boolean' },
    },
  },
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as ComponentMeta<typeof ViewModalWindow>;

const Template: ComponentStory<typeof ViewModalWindow> = (
  args: any,
) => <ViewModalWindow {...args} />;

export const Default = Template.bind({});

Default.args = {
  isVisible: true,
  title: '제목',
  children: <div>children</div>,
};
