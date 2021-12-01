/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { updateUserProfile } from '@/services/api/auth';

import PROFILE_FIXTURE from '../../fixtures/profile';

import reducer, {
  AuthStore,
  clearAuth,
  requestUpdateProfile,
  setAuth,
  setAuthError,
  setIsRegister,
  setUser,
} from './authSlice';
import { RootState } from './rootReducer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('@/services/api/auth');

describe('authReducer', () => {
  const initialState: AuthStore = {
    user: null,
    auth: null,
    authError: null,
    isRegister: false,
  };

  context('previous state가 undefined일 때', () => {
    it('초기 상태 스토어가 반환되어야만 한다', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setAuth', () => {
    it('user profile 정보가 반환되어야만 한다', () => {
      const { auth } = reducer(initialState, setAuth(PROFILE_FIXTURE));

      expect(auth).toEqual(PROFILE_FIXTURE);
    });
  });

  describe('setAuthError', () => {
    it('authError에 error가 존재해야만 한다', () => {
      const error = '에러!';

      const { authError } = reducer(initialState, setAuthError(error));

      expect(authError).toBe(error);
    });
  });

  describe('setUser', () => {
    it('user profile 정보가 반환되어야만 한다', () => {
      const { user } = reducer(initialState, setUser(PROFILE_FIXTURE));

      expect(user).toEqual(PROFILE_FIXTURE);
    });
  });

  describe('setIsRegister', () => {
    it('isRegister는 true를 반환해야만 한다', () => {
      const { isRegister } = reducer(initialState, setIsRegister(true));

      expect(isRegister).toBeTruthy();
    });
  });

  describe('clearAuth', () => {
    it('"auth", "isRegister", "authError"가 초기화되어야만 한다', () => {
      const state = reducer({
        ...initialState,
        isRegister: true,
        authError: 'error',
      }, clearAuth());

      expect(state).toEqual(initialState);
    });
  });
});

describe('authReducer async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let store: RootState;

  describe('requestUpdateProfile', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      (updateUserProfile as jest.Mock).mockReturnValueOnce(null);

      it('dispatch 액션이 "auth/setUser"인 타입과 profile 정보의 payload 이어야 한다', async () => {
        await store.dispatch(requestUpdateProfile(PROFILE_FIXTURE));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: PROFILE_FIXTURE,
          type: 'auth/setUser',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (updateUserProfile as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "auth/setAuthError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(requestUpdateProfile(PROFILE_FIXTURE));
        } catch (error) {
          // ignore errors
        } finally {
          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: 'error',
            type: 'auth/setAuthError',
          });
        }
      });
    });
  });
});
