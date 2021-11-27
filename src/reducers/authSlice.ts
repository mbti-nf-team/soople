import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/models/auth';
import { getUserProfile, postSignInWithGithub, postSignInWithGoogle } from '@/services/api/auth';

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
  },
});

export const {
  setAuth, setAuthError, setIsRegister, setUser,
} = actions;

export const requestSignInWithGoogle = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const profile = await postSignInWithGoogle();

    if (!profile) {
      dispatch(setAuth(profile));
      return;
    }

    const {
      displayName, email, photoURL, uid,
    } = profile;

    dispatch(setAuth({
      displayName,
      email,
      thumbnail: photoURL,
      uid,
    }));
  } catch (error: unknown) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export const requestSignInWithGithub = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const profile = await postSignInWithGithub();

    if (!profile) {
      dispatch(setAuth(profile));
      return;
    }

    const {
      displayName, email, photoURL, uid,
    } = profile;

    dispatch(setAuth({
      displayName,
      email,
      thumbnail: photoURL,
      uid,
    }));
  } catch (error: unknown) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export const searchUserProfile = (uid: string): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const profile = await getUserProfile(uid);

    if (!profile) {
      dispatch(setIsRegister(true));
      return;
    }

    dispatch(setUser(profile));
    dispatch(setAuth(null));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export default reducer;
