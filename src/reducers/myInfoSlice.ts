import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Group } from '@/models/group';
import { getUserAppliedGroups } from '@/services/api/applicants';
import { getUserRecruitedGroups } from '@/services/api/group';
import { formatGroup } from '@/utils/firestore';

import type { AppThunk } from './store';

export interface MyInfoStore {
  recruitedGroups: Group[];
  appliedGroups: Group[];
  myInfoError: string | null;
}

const { actions, reducer } = createSlice({
  name: 'myInfo',
  initialState: {
    recruitedGroups: [],
    appliedGroups: [],
    myInfoError: null,
  } as MyInfoStore,
  reducers: {
    setRecruitedGroups(state, { payload: recruitedGroups }: PayloadAction<Group[]>): MyInfoStore {
      return {
        ...state,
        recruitedGroups,
      };
    },
    setMyInfoError(state, { payload: myInfoError }: PayloadAction<string>): MyInfoStore {
      return {
        ...state,
        myInfoError,
      };
    },
    setAppliedGroups(state, { payload: appliedGroups }: PayloadAction<Group[]>): MyInfoStore {
      return {
        ...state,
        appliedGroups,
      };
    },
  },
});

export const {
  setAppliedGroups,
  setRecruitedGroups,
  setMyInfoError,
} = actions;

export const loadUserRecruitedGroups = (userUid: string): AppThunk => async (dispatch) => {
  try {
    const response = await getUserRecruitedGroups(userUid);

    const recruitedGroups = response.map(formatGroup) as Group[];

    dispatch(setRecruitedGroups(recruitedGroups));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setMyInfoError(message));
  }
};

export const loadUserAppliedGroups = (userUid: string): AppThunk => async (dispatch) => {
  try {
    const appliedGroups = await getUserAppliedGroups(userUid);

    const filteredGroups = appliedGroups.filter((group) => group) as Group[];

    dispatch(setAppliedGroups(filteredGroups));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setMyInfoError(message));
  }
};

export default reducer;
