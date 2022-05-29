import { ComponentMeta, ComponentStory } from '@storybook/react';

import Tag from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args: any) => <Tag {...args} />;

export const Default = Template.bind({});

Default.args = {
  tag: 'JavaScript',
  onClick: undefined,
};

export const HasClickEvent = Template.bind({});

HasClickEvent.args = {
  tag: 'JavaScript',
};
