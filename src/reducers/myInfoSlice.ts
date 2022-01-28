import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Group } from '@/models/group';
import { getUserRecruitedGroups } from '@/services/api/group';
import { formatGroup } from '@/utils/firestore';

import type { AppThunk } from './store';

export interface MyInfoStore {
  recruitedGroups: Group[];
  myInfoError: string | null;
}

const { actions, reducer } = createSlice({
  name: 'myInfo',
  initialState: {
    recruitedGroups: [],
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
  },
});

export const {
  setRecruitedGroups,
  setMyInfoError,
} = actions;

export const loadUserRecruitedGroups = (userUid: string): AppThunk => async (dispatch) => {
  try {
    const response = await getUserRecruitedGroups(userUid);

    const groups = response.map((doc) => formatGroup(doc)) as Group[];

    dispatch(setRecruitedGroups(groups));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setMyInfoError(message));
  }
};

export default reducer;
