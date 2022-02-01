import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/models/auth';
import {
  getUserProfile, postSignIn, postSignOut, postUserProfile,
} from '@/services/api/auth';

import type { AppDispatch, AppThunk } from './store';

export interface AuthStore {
  user: Profile | null;
  auth: Profile | null;
  authError: string | null;
  isVisible: boolean;
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    auth: null,
    authError: null,
    isVisible: false,
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
    clearAuth(state) {
      return {
        ...state,
        auth: null,
        authError: null,
      };
    },
  },
});

export const {
  setAuth, setAuthError, setUser, clearAuth,
} = actions;

export const requestUserProfile = (
  profile: Profile,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    await postUserProfile(profile);

    dispatch(setUser(profile));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export const requestSignOut = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    await postSignOut();

    dispatch(clearAuth());
    dispatch(setUser(null));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export const loadUserProfile = (uid: string) => async (dispatch: AppDispatch) => {
  try {
    const profile = await getUserProfile(uid);

    dispatch(setUser(profile));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export const requestSignIn = () => async (dispatch: AppDispatch) => {
  try {
    const user = await postSignIn();

    if (!user) {
      return;
    }

    const {
      uid, displayName, email, photoURL,
    } = user;

    const profile = await getUserProfile(uid);

    if (profile) {
      dispatch(setUser(profile));
      return;
    }

    dispatch(setAuth({
      uid,
      name: displayName,
      email: email as string,
      image: photoURL,
    }));
  } catch (error: unknown) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export default reducer;
