/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { getUserAppliedGroups } from '@/services/api/applicants';
import { getUserRecruitedGroups } from '@/services/api/group';
import { formatGroup } from '@/utils/firestore';

import GROUP_FIXTURE from '../../fixtures/group';

import reducer, {
  loadUserAppliedGroups,
  loadUserRecruitedGroups, MyInfoStore, setAppliedGroups, setMyInfoError, setRecruitedGroups,
} from './myInfoSlice';

jest.mock('@/utils/firestore');
jest.mock('@/services/api/group');
jest.mock('@/services/api/applicants');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('myInfoReducer', () => {
  const initialState: MyInfoStore = {
    recruitedGroups: [],
    appliedGroups: [],
    myInfoError: null,
  };

  context('previous state가 undefined일 때', () => {
    it('초기 상태 스토어가 반환되어야만 한다', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRecruitedGroups', () => {
    it('recruitedGroups 필드가 변경되어야 한다', () => {
      const { recruitedGroups } = reducer(
        initialState,
        setRecruitedGroups([GROUP_FIXTURE]),
      );

      expect(recruitedGroups).toEqual([GROUP_FIXTURE]);
    });
  });

  describe('setAppliedGroups', () => {
    it('appliedGroups 필드가 변경되어야 한다', () => {
      const { appliedGroups } = reducer(
        initialState,
        setAppliedGroups([GROUP_FIXTURE]),
      );

      expect(appliedGroups).toEqual([GROUP_FIXTURE]);
    });
  });

  describe('setMyInfoError', () => {
    it('myInfoError 필드가 변경되어야 한다', () => {
      const { myInfoError } = reducer(initialState, setMyInfoError('error'));

      expect(myInfoError).toBe('error');
    });
  });
});

describe('groupReducer async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let store: any;

  describe('loadUserRecruitedGroups', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      beforeEach(() => {
        (getUserRecruitedGroups as jest.Mock).mockReturnValueOnce([GROUP_FIXTURE]);
        (formatGroup as jest.Mock).mockReturnValueOnce(GROUP_FIXTURE);
      });

      it('dispatch 액션이 "myInfo/setRecruitedGroups"인 타입과 payload는 group 리스트여야 한다', async () => {
        await store.dispatch(loadUserRecruitedGroups('userUid'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: [GROUP_FIXTURE],
          type: 'myInfo/setRecruitedGroups',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      beforeEach(() => {
        (getUserRecruitedGroups as jest.Mock).mockImplementationOnce(() => {
          throw new Error('error');
        });
      });

      it('dispatch 액션이 "myInfo/setMyInfoError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(loadUserRecruitedGroups('userUid'));
        } catch (error) {
          // ignore errors
        } finally {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: 'error',
            type: 'myInfo/setMyInfoError',
          });
        }
      });
    });
  });

  describe('loadUserAppliedGroups', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      beforeEach(() => {
        (getUserAppliedGroups as jest.Mock).mockReturnValueOnce([GROUP_FIXTURE]);
      });

      it('dispatch 액션이 "myInfo/setAppliedGroups"인 타입과 payload는 group 리스트여야 한다', async () => {
        await store.dispatch(loadUserAppliedGroups('userUid'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: [GROUP_FIXTURE],
          type: 'myInfo/setAppliedGroups',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      beforeEach(() => {
        (getUserAppliedGroups as jest.Mock).mockImplementationOnce(() => {
          throw new Error('error');
        });
      });

      it('dispatch 액션이 "myInfo/setMyInfoError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(loadUserAppliedGroups('userUid'));
        } catch (error) {
          // ignore errors
        } finally {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: 'error',
            type: 'myInfo/setMyInfoError',
          });
        }
      });
    });
  });
});
