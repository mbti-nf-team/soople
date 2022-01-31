/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getApplicants, putApplicant } from '@/services/api/applicants';
import { patchCompletedGroup, postNewGroup } from '@/services/api/group';
import { updateTagCount } from '@/services/api/tagsCount';
import { formatApplicant } from '@/utils/firestore';

import APPLICANT_FIXTURE from '../../fixtures/applicant';
import COMMENT_FIXTURE from '../../fixtures/comment';
import GROUP_FIXTURE from '../../fixtures/group';
import PROFILE_FIXTURE from '../../fixtures/profile';
import WRITE_FIELDS_FIXTURE from '../../fixtures/writeFields';

import reducer, {
  changeWriteFields,
  clearWriteFields,
  GroupStore,
  loadApplicants,
  requestRegisterNewGroup,
  setApplicant,
  setApplicants,
  setComment,
  setComments,
  setGroup,
  setGroupError,
  setGroupId,
  setGroups,
  setPublishModalVisible,
  setTagsCount,
  updateApplicant,
  updateCompletedApply,
} from './groupSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('@/services/api/group');
jest.mock('@/services/api/tagsCount');
jest.mock('@/services/api/comment');
jest.mock('@/services/api/applicants');
jest.mock('@/utils/firestore');

describe('groupReducer', () => {
  const initialState: GroupStore = {
    groups: [],
    group: null,
    groupId: null,
    comments: [],
    groupError: null,
    writeFields: WRITE_FIELDS_FIXTURE,
    tagsCount: [],
    isVisible: false,
    applicants: [],
  };

  context('previous state가 undefined일 때', () => {
    it('초기 상태 스토어가 반환되어야만 한다', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setGroup', () => {
    it('group 필드가 변경되어야 한다', () => {
      const { group } = reducer(initialState, setGroup(GROUP_FIXTURE));

      expect(group).toBe(GROUP_FIXTURE);
    });
  });

  describe('setGroups', () => {
    it('groups 필드가 변경되어야 한다', () => {
      const { groups } = reducer(initialState, setGroups([GROUP_FIXTURE]));

      expect(groups).toEqual([GROUP_FIXTURE]);
    });
  });

  describe('setGroupId', () => {
    const id = '1';

    it('groupId 필드가 변경되어야 한다', () => {
      const { groupId } = reducer(initialState, setGroupId(id));

      expect(groupId).toBe(id);
    });
  });

  describe('changeWriteFields', () => {
    const title = 'title입니다.';

    it('write 필드가 변경되어야만 한다', () => {
      const { writeFields } = reducer(initialState, changeWriteFields({
        name: 'title',
        value: title,
      }));

      expect(writeFields).toEqual({
        ...WRITE_FIELDS_FIXTURE,
        title,
      });
    });
  });

  describe('clearWriteFields', () => {
    it('write 필드가 초기화되어야만 한다', () => {
      const { writeFields } = reducer({
        ...initialState,
        writeFields: {
          ...WRITE_FIELDS_FIXTURE,
          title: 'test',
        },
      }, clearWriteFields());

      expect(writeFields).toEqual(WRITE_FIELDS_FIXTURE);
    });
  });

  describe('setGroupError', () => {
    const error = 'error';

    it('에러 메시지가 반환되어야만 한다', () => {
      const { groupError } = reducer(initialState, setGroupError(error));

      expect(groupError).toEqual(error);
    });
  });

  describe('setPublishModalVisible', () => {
    it('isVisible이 true로 변경되어야만 한다', () => {
      const { isVisible } = reducer(initialState, setPublishModalVisible(true));

      expect(isVisible).toBeTruthy();
    });
  });

  describe('setComments', () => {
    it('comments에 값이 추가되야만 한다', () => {
      const { comments } = reducer(initialState, setComments([COMMENT_FIXTURE]));

      expect(comments).toEqual([COMMENT_FIXTURE]);
    });
  });

  describe('setComment', () => {
    it('comments에 값이 추가되야만 한다', () => {
      const { comments } = reducer(initialState, setComment(COMMENT_FIXTURE));

      expect(comments).toEqual([COMMENT_FIXTURE]);
    });
  });

  describe('setTagsCount', () => {
    const tags = [
      { name: 'test', count: 1 },
    ];

    it('tagsCount에 값이 추가되야만 한다', () => {
      const { tagsCount } = reducer(initialState, setTagsCount(tags));

      expect(tagsCount).toEqual(tags);
    });
  });

  describe('setApplicant', () => {
    it('applicants에 값이 추가되야만 한다', () => {
      const { applicants } = reducer(initialState, setApplicant(APPLICANT_FIXTURE));

      expect(applicants).toEqual([APPLICANT_FIXTURE]);
    });
  });

  describe('setApplicants', () => {
    it('applicants에 값이 추가되야만 한다', () => {
      const { applicants } = reducer(initialState, setApplicants([APPLICANT_FIXTURE]));

      expect(applicants).toEqual([APPLICANT_FIXTURE]);
    });
  });
});

describe('groupReducer async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let store: any;

  describe('requestRegisterNewGroup', () => {
    beforeEach(() => {
      store = mockStore({
        groupReducer: {
          writeFields: {
            ...WRITE_FIELDS_FIXTURE,
            tags: ['test1', 'test2'],
          },
        },
      });
    });

    context('에러가 발생하지 않는 경우', () => {
      (postNewGroup as jest.Mock).mockReturnValueOnce('1');
      (updateTagCount as jest.Mock).mockImplementation(() => Promise.resolve('test'));

      it('dispatch 액션이 "group/setGroupId"인 타입과 group id 이어야 한다', async () => {
        await store.dispatch(requestRegisterNewGroup(PROFILE_FIXTURE));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: '1',
          type: 'group/setGroupId',
        });
        expect(actions[1]).toEqual({
          payload: false,
          type: 'group/setPublishModalVisible',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (postNewGroup as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "group/setGroupError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(requestRegisterNewGroup(PROFILE_FIXTURE));
        } catch (error) {
          // ignore errors
        } finally {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: 'error',
            type: 'group/setGroupError',
          });
        }
      });
    });
  });

  describe('loadApplicants', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      (getApplicants as jest.Mock).mockReturnValueOnce([APPLICANT_FIXTURE]);
      (formatApplicant as jest.Mock).mockReturnValueOnce(APPLICANT_FIXTURE);

      it('dispatch 액션이 "group/setApplicants"인 타입과 payload는 applicants 리스트여야 한다', async () => {
        await store.dispatch(loadApplicants('groupId'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: [APPLICANT_FIXTURE],
          type: 'group/setApplicants',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (getApplicants as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "group/setGroupError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(loadApplicants('groupId'));
        } catch (error) {
          // ignore errors
        } finally {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: 'error',
            type: 'group/setGroupError',
          });
        }
      });
    });
  });

  describe('updateApplicant', () => {
    beforeEach(() => {
      store = mockStore({
        groupReducer: {
          applicants: [APPLICANT_FIXTURE, {
            ...APPLICANT_FIXTURE,
            uid: '1',
          }],
        },
      });
    });

    context('에러가 발생하지 않는 경우', () => {
      (putApplicant as jest.Mock).mockReturnValueOnce(null);

      it('dispatch 액션이 "group/setApplicants"인 타입과 payload는 applicants여야 한다', async () => {
        await store.dispatch(updateApplicant({
          ...APPLICANT_FIXTURE,
          isConfirm: true,
        }));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: [{
            ...APPLICANT_FIXTURE,
            isConfirm: true,
          }, {
            ...APPLICANT_FIXTURE,
            uid: '1',
          }],
          type: 'group/setApplicants',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (putApplicant as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "group/setGroupError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(updateApplicant(APPLICANT_FIXTURE));
        } catch (error) {
          // ignore errors
        } finally {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: 'error',
            type: 'group/setGroupError',
          });
        }
      });
    });
  });

  describe('updateCompletedApply', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      (patchCompletedGroup as jest.Mock).mockReturnValueOnce(null);

      it('dispatch 액션이 "group/setGroup"인 타입과 payload는 group여야 한다', async () => {
        await store.dispatch(updateCompletedApply(GROUP_FIXTURE, 3));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: {
            ...GROUP_FIXTURE,
            numberApplicants: 3,
            isCompleted: true,
          },
          type: 'group/setGroup',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (patchCompletedGroup as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "group/setGroupError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(updateCompletedApply(GROUP_FIXTURE, 3));
        } catch (error) {
          // ignore errors
        } finally {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: 'error',
            type: 'group/setGroupError',
          });
        }
      });
    });
  });
});
