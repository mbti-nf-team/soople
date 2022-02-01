import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Profile } from '@/models/auth';
import {
  Applicant,
  Comment,
  Group, TagCount, WriteFields, WriteFieldsForm,
} from '@/models/group';
import { getApplicants, putApplicant } from '@/services/api/applicants';
import { patchCompletedGroup, postNewGroup } from '@/services/api/group';
import { updateTagCount } from '@/services/api/tagsCount';

import type { AppThunk } from './store';

export interface GroupStore {
  groupId: string | null;
  groups: Group[];
  group: Group | null;
  comments: Comment[];
  groupError: string | null;
  writeFields: WriteFields;
  tagsCount: TagCount[];
  isVisible: boolean;
  applicants: Applicant[];
}

const initialFieldsState: WriteFields = {
  title: '',
  content: '',
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
    tagsCount: [],
    isVisible: false,
    applicants: [],
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
    setGroup(state, { payload: group }: PayloadAction<Group | null>): GroupStore {
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
    setTagsCount(state, { payload: tagsCount }: PayloadAction<TagCount[]>): GroupStore {
      return {
        ...state,
        tagsCount,
      };
    },
    setApplicant(state, { payload: applicant }: PayloadAction<Applicant>): GroupStore {
      return {
        ...state,
        applicants: [
          ...state.applicants,
          applicant,
        ],
      };
    },
    setApplicants(state, { payload: applicants }: PayloadAction<Applicant[]>): GroupStore {
      return {
        ...state,
        applicants,
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
  setApplicant,
  setTagsCount,
  setApplicants,
  setGroupError,
  clearWriteFields,
  changeWriteFields,
} = actions;

export const requestRegisterNewGroup = (
  profile: Profile,
): AppThunk => async (dispatch, getStore) => {
  const { groupReducer: { writeFields } } = getStore();

  try {
    const responseUpdateTags = writeFields.tags.map(updateTagCount);

    const [groupId] = await Promise.all([
      postNewGroup(profile, writeFields),
      ...responseUpdateTags,
    ]);

    dispatch(setGroupId(groupId));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export const loadApplicants = (groupId: string): AppThunk => async (dispatch) => {
  try {
    const applicants = await getApplicants(groupId);

    dispatch(setApplicants(applicants));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export const updateApplicant = (
  requestApplicant: Applicant,
): AppThunk => async (dispatch, getState) => {
  const { groupReducer: { applicants } } = getState();

  try {
    await putApplicant(requestApplicant);

    const newApplicants = applicants.map((applicant) => {
      if (requestApplicant.uid === applicant.uid) {
        return requestApplicant;
      }

      return applicant;
    });

    dispatch(setApplicants(newApplicants));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export const updateCompletedApply = (
  group: Group,
  numberConfirmApplicants: number,
): AppThunk => async (dispatch) => {
  try {
    const { groupId } = group;

    await patchCompletedGroup(groupId, numberConfirmApplicants);

    dispatch(setGroup({
      ...group,
      numberApplicants: numberConfirmApplicants,
      isCompleted: true,
    }));
  } catch (error) {
    const { message } = error as Error;

    dispatch(setGroupError(message));
  }
};

export default reducer;
