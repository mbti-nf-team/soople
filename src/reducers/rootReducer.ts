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

const rootReducer = (state: RootReducerState | undefined, action: AnyAction): RootReducerState => {
  if (action.type === HYDRATE) {
    const nextState: RootReducerState = {
      ...state,
      ...action.payload,
    };

    return {
      ...nextState,
      groupReducer: {
        ...nextState.groupReducer,
        groups: state ? state.groupReducer.groups : [],
        tagsCount: state ? state.groupReducer.tagsCount : [],
      },
    } as RootReducerState;
  }

  return combineReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
