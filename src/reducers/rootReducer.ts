import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import authReducer, { AuthStore } from './authSlice';

export interface RootReducerState {
  authReducer: AuthStore;
}

const combineReducer = combineReducers({
  authReducer,
});

const rootReducer = (state: RootReducerState | undefined, action: AnyAction): RootReducerState => {
  if (action.type === HYDRATE) {
    const nextState: RootReducerState = {
      ...state,
      ...action.payload,
    };

    const { authReducer: authStore } = nextState;

    return {
      authReducer: {
        ...authStore,
        user: authStore.user ? authStore.user : state?.authReducer.user,
      },
    } as RootReducerState;
  }

  return combineReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
