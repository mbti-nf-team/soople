import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { isProdLevel } from '@/utils/utils';

import rootReducer from './rootReducer';

export const makeStore = configureStore({
  reducer: rootReducer,
  devTools: !isProdLevel(process.env.NODE_ENV),
});

const wrapper = createWrapper(() => makeStore, {
  debug: !isProdLevel(process.env.NODE_ENV),
});

export type AppDispatch = typeof makeStore.dispatch
export type RootState = ReturnType<typeof makeStore.getState>

export default wrapper;
