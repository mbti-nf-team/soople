import dayjs from 'dayjs';
import { destroyCookie, setCookie } from 'nookies';

import { Group } from '@/models/group';

export const isProdLevel = (env: string): boolean => env === 'production';

export const targetFalseThenValue = (
  target?: boolean,
) => <T>(value: T): undefined | T => (target ? undefined : value);

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
  currentTime?: number,
) => dayjs(recruitmentEndDate).diff(currentTime) >= 0;

export const isRecruiting = (group: Group, time?: number) => {
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

export const removeToken = () => {
  destroyCookie(null, 'token');
  setCookie(null, 'token', '', { path: '/' });
};
