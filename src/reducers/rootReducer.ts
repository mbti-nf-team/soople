import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import authReducer, { AuthStore } from './authSlice';
import groupReducer, { GroupStore } from './groupSlice';

export interface RootReducerState {
  authReducer: AuthStore,
  groupReducer: GroupStore,
}

const combineReducer = combineReducers({
  authReducer,
  groupReducer,
});

const rootReducer = (state: RootReducerState | undefined, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
