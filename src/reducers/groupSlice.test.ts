/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { postNewGroup } from '@/services/api/group';

import WRITE_FIELDS_FIXTURE from '../../fixtures/writeFields';

import reducer, {
  changeWriteFields,
  clearWriteFields,
  GroupStore,
  requestRegisterNewGroup,
  setGroupError,
  setGroupId,
  setPublishModalVisible,
} from './groupSlice';
import { RootState } from './rootReducer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('@/services/api/group');

describe('groupReducer', () => {
  const initialState: GroupStore = {
    groupId: null,
    groupError: null,
    writeFields: WRITE_FIELDS_FIXTURE,
    isVisible: false,
  };

  context('previous state가 undefined일 때', () => {
    it('초기 상태 스토어가 반환되어야만 한다', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
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
});

describe('groupReducer async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let store: RootState;

  describe('requestRegisterNewGroup', () => {
    beforeEach(() => {
      store = mockStore({
        groupReducer: {
          writeFields: WRITE_FIELDS_FIXTURE,
        },
      });
    });

    context('에러가 발생하지 않는 경우', () => {
      (postNewGroup as jest.Mock).mockReturnValueOnce('1');

      it('dispatch 액션이 "group/setGroupId"인 타입과 group id 이어야 한다', async () => {
        await store.dispatch(requestRegisterNewGroup());

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
          await store.dispatch(requestRegisterNewGroup());
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
