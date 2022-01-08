import { Group } from '@/models/group';

import PROFILE_FIXTURE from './profile';

const group: Group = {
  groupId: '1',
  writer: PROFILE_FIXTURE,
  title: 'title',
  content: 'content',
  tags: [],
  category: 'frontEnd',
  recruitmentEndDate: '',
  recruitmentEndSetting: 'manual',
  isCompleted: false,
  views: 0,
  createdAt: '2021-10-11',
};

export default group;
