import { Alarm } from '@/models/alarm';

import group from './group';

const alarm: Alarm = {
  uid: '1',
  group,
  userUid: '2',
  isViewed: false,
  type: 'confirmed',
  createdAt: '2021-11-11',
  applicant: null,
};

export default alarm;
