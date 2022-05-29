import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from './Button';
import SubHeader from './SubHeader';

const Wrapper = styled.div`
  & > div {
    position: inherit;
  }
`;

export default {
  title: 'Components/SubHeader',
  component: SubHeader,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
} as ComponentMeta<typeof SubHeader>;

const Template: ComponentStory<typeof SubHeader> = (args: any) => <SubHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  previousText: '뒤로가기',
  children: (
    <Button type="button" color="success">
      모집 완료
    </Button>
  ),
};
