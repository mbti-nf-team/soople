import { Profile } from './auth';
import { Group } from './group';

export type AlarmType = 'confirm' | 'reject' | 'apply';

export interface Alarm {
  uid: string;
  user: Profile;
  group: Group;
  type: AlarmType;
  isViewed: boolean;
  createdAt: string;
}

export interface AlarmForm {
  user: Profile;
  group: Group;
  type: AlarmType;
}
