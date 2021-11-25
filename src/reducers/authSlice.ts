import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postSignInWithGithub, postSignInWithGoogle } from '@/services/api/auth';

import type { AppDispatch } from './store';

export interface AuthStore {
  user: string;
  auth: string | null;
  authError: string;
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {
    user: '',
    auth: '',
    authError: '',
  } as AuthStore,
  reducers: {
    setAuth(state, { payload: auth }: PayloadAction<string | null>) {
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
  },
});

export const { setAuth, setAuthError } = actions;

export const requestSignInWithGoogle = () => async (dispatch: AppDispatch) => {
  try {
    const result = await postSignInWithGoogle();

    if (!result) {
      dispatch(setAuth(result));
      return;
    }

    dispatch(setAuth(result.email));
  } catch (error: unknown) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export const requestSignInWithGithub = () => async (dispatch: AppDispatch) => {
  try {
    const result = await postSignInWithGithub();

    if (!result) {
      dispatch(setAuth(result));
      return;
    }

    dispatch(setAuth(result.email));
  } catch (error: unknown) {
    const { message } = error as Error;

    dispatch(setAuthError(message));
  }
};

export default reducer;
