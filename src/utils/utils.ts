import dayjs from 'dayjs';

import { Group } from '@/models/group';
import type { AuthStore } from '@/reducers/authSlice';
import type { GroupStore } from '@/reducers/groupSlice';
import type { AppState } from '@/reducers/store';

export const isProdLevel = (env: string): boolean => env === 'production';

export const getAuth = <K extends keyof AuthStore>(
  key: K,
) => (obj: AppState) => obj.authReducer[key];

export const getGroup = <K extends keyof GroupStore>(
  key: K,
) => (obj: AppState) => obj.groupReducer[key];

export const stringToExcludeNull = (value?: string | null): string => {
  if (typeof value === 'undefined') {
    return '';
  }

  if (value === null) {
    return '';
  }

  return value;
};

export const emptyAThenB = (b: string, a?: string | null): string => a || b;

export const tomorrow = (date: Date) => {
  date.setDate(date.getDate() + 1);

  return date.toString();
};

export const yesterday = (date: Date) => {
  date.setDate(date.getDate() - 1);

  return date.toString();
};

export const isCurrentTimeBeforeEndDate = (
  recruitmentEndDate: string | null,
  currentTime: number,
) => dayjs(recruitmentEndDate).diff(currentTime) >= 0;

export const isRecruiting = (group: Group, time: number) => {
  const { recruitmentEndDate, recruitmentEndSetting } = group;

  if (!recruitmentEndDate && recruitmentEndSetting === 'manual') {
    return true;
  }

  return isCurrentTimeBeforeEndDate(recruitmentEndDate, time);
};

export const isRecruitCompletedAndManual = (group: Group) => {
  const { recruitmentEndDate, recruitmentEndSetting, isCompleted } = group;

  return isCompleted || (!recruitmentEndDate && recruitmentEndSetting === 'manual');
};
