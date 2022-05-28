import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import DropDown from './DropDown';

const Wrapper = styled.div`
  transform: scale(1);
  height: 30vh;
  position: relative;

  & > div {
    right: unset;
    top: 0;
  }
`;

export default {
  title: 'Components/DropDown',
  component: DropDown,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args: any) => <DropDown {...args} />;

export const Default = Template.bind({});

Default.args = {
  isVisible: true,
  name: 'user',
  email: 'user@test.com',
};

export const HasAlarm = Template.bind({});

HasAlarm.args = {
  isVisible: true,
  name: 'user',
  email: 'user@test.com',
  numberAlertAlarms: 5,
};
