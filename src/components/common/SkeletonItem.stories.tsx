import { ComponentMeta, ComponentStory } from '@storybook/react';

import SkeletonItem from './SkeletonItem';

export default {
  title: 'Components/SkeletonItem',
  component: SkeletonItem,
} as ComponentMeta<typeof SkeletonItem>;

const Template: ComponentStory<typeof SkeletonItem> = (args: any) => <SkeletonItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  styles: {
    width: '300px',
    height: '50px',
  },
};

export const Circle = Template.bind({});

Circle.args = {
  styles: {
    width: '100px',
    height: '100px',
  },
  circle: true,
};
