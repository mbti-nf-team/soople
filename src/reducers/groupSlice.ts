import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/models/auth';
import { getGroupDetail, postNewGroup } from '@/services/api/group';

import { Group, WriteFields, WriteFieldsForm } from '../models/group';

import type { AppThunk } from './store';

export interface GroupStore {
  group: Group | null;
  groupError: string | null;
  writeFields: WriteFields;
  writer: Profile | null;
  groupId: string | null;
  isVisible: boolean;
}

const initialFieldsState: WriteFields = {
  title: '',
  contents: '',
  tags: [],
  category: '',
  recruitmentEndDate: '',
  recruitmentEndSetting: 'automatic',
};

const { actions, reducer } = createSlice({
  name: 'group',
  initialState: {
    group: null,
    groupId: null,
    groupError: null,
    writeFields: initialFieldsState,
    writer: null,
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
    setGroup(state, { payload: group }: PayloadAction<Group | null>):GroupStore {
      return {
        ...state,
        group,
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
    setWriterProfile(state, { payload: writer }: PayloadAction<Profile>) {
      return {
        ...state,
        writer,
      };
    },
  },
});

export const {
  changeWriteFields,
  clearWriteFields,
  setGroupError,
  setGroupId,
  setPublishModalVisible,
  setGroup,
  setWriterProfile,
} = actions;

export const requestRegisterNewGroup = (
  userUid: string,
): AppThunk => async (dispatch, getStore) => {
  const { groupReducer } = getStore();

  try {
    const groupId = await postNewGroup(userUid, groupReducer.writeFields);

    dispatch(setGroupId(groupId));
    dispatch(setPublishModalVisible(false));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export const loadGroupDetail = (id: string): AppThunk => async (dispatch) => {
  try {
    const response = await getGroupDetail(id);

    dispatch(setGroup(response));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export default reducer;
