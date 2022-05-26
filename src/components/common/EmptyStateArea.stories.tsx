import { ComponentMeta, ComponentStory } from '@storybook/react';

import EmptySvg from '../../assets/icons/empty-frame.svg';

import EmptyStateArea from './EmptyStateArea';

export default {
  title: 'Components/Common/EmptyStateArea',
  component: EmptyStateArea,
} as ComponentMeta<typeof EmptyStateArea>;

const Template: ComponentStory<typeof EmptyStateArea> = (args: any) => <EmptyStateArea {...args} />;

export const Default = Template.bind({});

Default.args = {
  emptyText: '리스트가 존재하지 않아요.',
  buttonText: '확인',
};

export const HasImage = Template.bind({});

HasImage.args = {
  emptyText: '리스트가 존재하지 않아요.',
  buttonText: '확인',
  imageUrl: EmptySvg,
};
