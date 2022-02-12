import { Alarm } from '@/models/alarm';

import group from './group';
import profile from './profile';

const alarm: Alarm = {
  uid: '1',
  group,
  user: profile,
  isViewed: false,
  type: 'confirmed',
  createdAt: '2021-11-11',
};

export default alarm;
