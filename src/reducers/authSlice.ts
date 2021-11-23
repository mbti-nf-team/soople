import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthStore {
  user: string;
  auth: string;
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
    setAuth(state, { payload: auth }: PayloadAction<string>) {
      return {
        ...state,
        auth,
      };
    },
  },
});

export const { setAuth } = actions;

export default reducer;
