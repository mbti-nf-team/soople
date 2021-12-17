import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/models/auth';
import {
  Category,
  Group, WriteFields, WriteFieldsForm,
} from '@/models/group';
import { getGroupDetail, getGroups, postNewGroup } from '@/services/api/group';
import { formatGroup } from '@/utils/firestore';

import type { AppThunk } from './store';

export interface GroupStore {
  groups: Group[];
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
    groups: [],
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
    setGroups(state, { payload: groups }: PayloadAction<Group[]>): GroupStore {
      return {
        ...state,
        groups,
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
  setGroup,
  setGroups,
  setGroupId,
  setGroupError,
  clearWriteFields,
  setWriterProfile,
  changeWriteFields,
  setPublishModalVisible,
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
    const group = await getGroupDetail(id);

    dispatch(setGroup(group));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export const loadGroups = (condition: Category[]): AppThunk => async (dispatch) => {
  try {
    const response = await getGroups(condition);

    const groups = response.map((doc) => formatGroup(doc)) as Group[];

    dispatch(setGroups(groups));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export default reducer;
