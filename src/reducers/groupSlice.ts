import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postNewGroup } from '@/services/api/group';

import { WriteFields, WriteFieldsForm } from '../models/group';

import type { AppThunk } from './store';

export interface GroupStore {
  groupError: string | null;
  writeFields: WriteFields;
  groupId: string | null;
  isVisible: boolean;
}

const initialFieldsState: WriteFields = {
  title: '',
  contents: '',
  tags: [],
};

const { actions, reducer } = createSlice({
  name: 'group',
  initialState: {
    groupId: null,
    groupError: null,
    writeFields: initialFieldsState,
    isVisible: false,
  } as GroupStore,
  reducers: {
    changeWriteFields(state, { payload: { name, value } }: PayloadAction<WriteFieldsForm>) {
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
    setPublishModalVisible(state, { payload: isVisible }: PayloadAction<boolean>) {
      return {
        ...state,
        isVisible,
      };
    },
  },
});

export const {
  changeWriteFields, clearWriteFields, setGroupError, setGroupId, setPublishModalVisible,
} = actions;

export const requestRegisterNewGroup = (): AppThunk => async (dispatch, getStore) => {
  const { groupReducer } = getStore();

  try {
    const groupId = await postNewGroup(groupReducer.writeFields);

    dispatch(setGroupId(groupId));
    dispatch(setPublishModalVisible(false));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export default reducer;
