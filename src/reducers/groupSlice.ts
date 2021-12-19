import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/models/auth';
import {
  Category,
  Comment,
  CommentFields,
  Group, WriteFields, WriteFieldsForm,
} from '@/models/group';
import { getGroupComments, postGroupComment } from '@/services/api/comment';
import {
  getGroupDetail, getGroups, postNewGroup,
} from '@/services/api/group';
import { formatComment, formatGroup } from '@/utils/firestore';

import type { AppThunk } from './store';

export interface GroupStore {
  groupId: string | null;
  groups: Group[];
  group: Group | null;
  comments: Comment[];
  groupError: string | null;
  writeFields: WriteFields;
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
    groupId: null,
    groups: [],
    group: null,
    comments: [],
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
    setComments(state, { payload: comments }: PayloadAction<Comment[]>): GroupStore {
      return {
        ...state,
        comments,
      };
    },
    setComment(state, { payload: comment }: PayloadAction<Comment>): GroupStore {
      return {
        ...state,
        comments: [
          ...state.comments,
          comment,
        ],
      };
    },
  },
});

export const {
  setGroup,
  setGroups,
  setComment,
  setGroupId,
  setComments,
  setGroupError,
  clearWriteFields,
  changeWriteFields,
  setPublishModalVisible,
} = actions;

export const requestRegisterNewGroup = (
  profile: Profile,
): AppThunk => async (dispatch, getStore) => {
  const { groupReducer } = getStore();

  try {
    const groupId = await postNewGroup(profile, groupReducer.writeFields);

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

export const loadComments = (groupId: string): AppThunk => async (dispatch) => {
  try {
    const response = await getGroupComments(groupId);

    const comments = response.map((doc) => formatComment(doc)) as Comment[];

    dispatch(setComments(comments));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export const requestAddComment = (
  fields: CommentFields,
): AppThunk => async (dispatch, getState) => {
  const { groupReducer: { group } } = getState();
  const { groupId } = (group as Group);

  try {
    const commentId = await postGroupComment({
      groupId,
      ...fields,
    });

    const { content, writer } = fields;

    dispatch(setComment({
      commentId,
      groupId,
      content,
      writer,
      createdAt: new Date().toString(),
    }));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export default reducer;
