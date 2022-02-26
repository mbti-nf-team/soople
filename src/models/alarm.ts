import { Profile } from './auth';
import { Group } from './group';

export type AlarmType = 'confirmed' | 'rejected' | 'applied';

export interface Alarm {
  uid: string;
  user: Profile;
  group: Group;
  type: AlarmType;
  isViewed: boolean;
  createdAt: string;
}

export interface AlarmForm {
  userUid: string;
  groupId: string;
  type: AlarmType;
}

export interface AlarmResponse {
  userUid: string;
  groupId: string;
  type: AlarmType;
  isViewed: boolean;
  createdAt: string;
}

export interface AlertAlarm extends AlarmResponse {
  uid: string;
}
