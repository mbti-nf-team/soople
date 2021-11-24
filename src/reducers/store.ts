import { useDispatch } from 'react-redux';

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { isProdLevel } from '@/utils/utils';

import rootReducer from './rootReducer';

export const makeStore = () => configureStore({
  reducer: rootReducer,
  devTools: !isProdLevel(process.env.NODE_ENV),
});

const wrapper = createWrapper(makeStore, {
  debug: !isProdLevel(process.env.NODE_ENV),
});

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default wrapper;
