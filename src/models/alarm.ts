import { Profile } from './auth';
import { Group } from './group';

export type AlarmType = 'confirmed' | 'rejected' | 'applied';

export interface Alarm {
  uid: string;
  userUid: string;
  group: Group;
  type: AlarmType;
  applicant: Profile | null;
  isViewed: boolean;
  createdAt: string;
}

export interface AlarmForm {
  userUid: string;
  applicant: Profile | null;
  groupId: string;
  type: AlarmType;
}
