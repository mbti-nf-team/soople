import dayjs from 'dayjs';
import { destroyCookie, setCookie } from 'nookies';
import sanitizeHtml from 'sanitize-html';

import { Group } from '@/models/group';

export const isProdLevel = (env: string): boolean => env === 'production';

export const stringToExcludeNull = (value?: string | null): string => {
  if (typeof value === 'undefined') {
    return '';
  }

  if (value === null) {
    return '';
  }

  return value;
};

export const hasBackground = (pathname: string) => pathname === '/' || pathname === '/404' || pathname === '/500';

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

export const removeAllHtml = (content: string) => sanitizeHtml(content, {
  allowedTags: [],
  allowedAttributes: {},
});

export const removeToken = () => {
  destroyCookie(null, 'token');
  setCookie(null, 'token', '', { path: '/' });
};

export const trueOrFalse = (value?: string | null | number | boolean): boolean => {
  if (!value) {
    return false;
  }

  return true;
};
