import { AuthStore } from '@/reducers/authSlice';
import type { AppState } from '@/reducers/store';

export const isProdLevel = (env: string): boolean => env === 'production';

export const getAuth = <K extends keyof AuthStore>(
  key: K,
) => (obj: AppState) => obj.authReducer[key];
