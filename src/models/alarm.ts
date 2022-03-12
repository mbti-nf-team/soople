import { Group } from '@/models/group';

import { Profile } from './auth';

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
  applicantUid: string | null;
  group: Group;
  type: AlarmType;
}

export interface AlarmResponse {
  userUid: string;
  group: Group;
  applicantUid: string | null;
  type: AlarmType;
  isViewed: boolean;
  createdAt: string;
}

export interface AlertAlarm extends AlarmResponse {
  uid: string;
}
