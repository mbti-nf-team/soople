import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postNewGroup } from '@/services/api/group';

import { WriteFields, WriteFieldsKey } from '../models/group';

import type { AppThunk } from './store';

export interface GroupStore {
  groupError: string | null;
  writeFields: WriteFields;
  groupId: string | null;
}

const initialFieldsState: WriteFields = {
  title: '',
  contents: '',
};

const { actions, reducer } = createSlice({
  name: 'group',
  initialState: {
    groupId: null,
    groupError: null,
    writeFields: initialFieldsState,
  } as GroupStore,
  reducers: {
    changeWriteFields(state, { payload: { name, value } }: PayloadAction<WriteFieldsKey>) {
      return {
        ...state,
        writeFields: {
          ...state.writeFields,
          [name]: value,
        },
      };
    },
    clearWriteFields(state): GroupStore {
      return {
        ...state,
        writeFields: initialFieldsState,
      };
    },
    setGroupId(state, { payload: id }: PayloadAction<string>):GroupStore {
      return {
        ...state,
        groupId: id,
      };
    },
    setGroupError(state, { payload: error }: PayloadAction<string>): GroupStore {
      return {
        ...state,
        groupError: error,
      };
    },
  },
});

export const {
  changeWriteFields, clearWriteFields, setGroupError, setGroupId,
} = actions;

export const requestRegisterNewGroup = (): AppThunk => async (dispatch, getStore) => {
  const { groupReducer } = getStore();

  try {
    const groupId = await postNewGroup(groupReducer.writeFields);

    dispatch(setGroupId(groupId));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export default reducer;
