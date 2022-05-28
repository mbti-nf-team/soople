import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfileImage from './ProfileImage';

export default {
  title: 'Components/ProfileImage',
  component: ProfileImage,
  argTypes: {
    src: {
      description: 'image url',
    },
  },
} as ComponentMeta<typeof ProfileImage>;

const Template: ComponentStory<typeof ProfileImage> = (args: any) => <ProfileImage {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const HasImageUrl = Template.bind({});

HasImageUrl.args = {
  src: '/img_avatar_default.png',
};
