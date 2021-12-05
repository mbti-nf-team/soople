import { AuthStore } from '@/reducers/authSlice';
import { GroupStore } from '@/reducers/groupSlice';
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
