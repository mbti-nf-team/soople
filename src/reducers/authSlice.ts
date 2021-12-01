import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/models/auth';
import { updateUserProfile } from '@/services/api/auth';

import type { AppDispatch, AppThunk } from './store';

export interface AuthStore {
  user: Profile | null;
  auth: Profile | null;
  authError: string | null;
  isRegister: boolean;
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    auth: null,
    isRegister: false,
    authError: null,
  } as AuthStore,
  reducers: {
    setUser(state, { payload: user }: PayloadAction<Profile | null>) {
      return {
        ...state,
        user,
      };
    },
    setAuth(state, { payload: auth }: PayloadAction<Profile | null>) {
      return {
        ...state,
        auth,
      };
    },
    setAuthError(state, { payload: error }: PayloadAction<string>) {
      return {
        ...state,
        authError: error,
      };
    },
    setIsRegister(state, { payload: isRegister }: PayloadAction<boolean>) {
      return {
        ...state,
        isRegister,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        auth: null,
        isRegister: false,
        authError: null,
      };
    },
  },
});

export const {
  setAuth, setAuthError, setIsRegister, setUser, clearAuth,
} = actions;

export const requestUpdateProfile = (
  profile: Profile,
): AppThunk => async (dispatch:AppDispatch) => {
  try {
    await updateUserProfile(profile);

    dispatch(setUser(profile));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export default reducer;
