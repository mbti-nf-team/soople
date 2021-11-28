/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  getUserProfile, postSignInWithGithub, postSignInWithGoogle, postUserProfile,
} from '@/services/api/auth';

import PROFILE_FIXTURE from '../../fixtures/profile';

import reducer, {
  AuthStore,
  clearAuth,
  requestSignInWithGithub,
  requestSignInWithGoogle,
  saveUserProfile,
  searchUserProfile,
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

  describe('requestSignInWithGoogle', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      context('반환 값이 null인 경우', () => {
        (postSignInWithGoogle as jest.Mock).mockReturnValueOnce(null);

        it('dispatch 액션이 "auth/setAuth"인 타입과 null인 payload 이어야 한다', async () => {
          await store.dispatch(requestSignInWithGoogle());

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: null,
            type: 'auth/setAuth',
          });
        });
      });

      context('반환 값이 null 아닌 경우', () => {
        const email = 'test@test.com';

        (postSignInWithGoogle as jest.Mock).mockReturnValueOnce({
          email,
        });

        it('dispatch 액션이 "auth/setAuth"인 타입과 null이 아닌 payload 이어야 한다', async () => {
          await store.dispatch(requestSignInWithGoogle());

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: {
              email,
            },
            type: 'auth/setAuth',
          });
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (postSignInWithGoogle as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "auth/setAuthError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(requestSignInWithGoogle());
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

  describe('requestSignInWithGithub', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      context('반환 값이 null인 경우', () => {
        (postSignInWithGithub as jest.Mock).mockReturnValueOnce(null);

        it('dispatch 액션이 "auth/setAuth"인 타입과 null인 payload 이어야 한다', async () => {
          await store.dispatch(requestSignInWithGithub());

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: null,
            type: 'auth/setAuth',
          });
        });
      });

      context('반환 값이 null 아닌 경우', () => {
        const email = 'test@test.com';

        (postSignInWithGithub as jest.Mock).mockReturnValueOnce({
          email,
        });

        it('dispatch 액션이 "auth/setAuth"인 타입과 null이 아닌 payload 이어야 한다', async () => {
          await store.dispatch(requestSignInWithGithub());

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: {
              email,
            },
            type: 'auth/setAuth',
          });
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (postSignInWithGithub as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "auth/setAuthError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(requestSignInWithGithub());
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

  describe('searchUserProfile', () => {
    const uid = '1234567';

    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      context('반환 값이 null인 경우', () => {
        (getUserProfile as jest.Mock).mockReturnValueOnce(null);

        it('dispatch 액션이 "auth/setIsRegister"인 타입과 true인 payload 이어야 한다', async () => {
          await store.dispatch(searchUserProfile(uid));

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: true,
            type: 'auth/setIsRegister',
          });
        });
      });

      context('반환 값이 null 아닌 경우', () => {
        const profile = {
          uid: '1234567',
          email: 'test@test.com',
        };

        (getUserProfile as jest.Mock).mockReturnValueOnce(profile);

        it('dispatch 액션이 "auth/setUser"인 타입과 profile 정보의 payload 이어야 한다', async () => {
          await store.dispatch(searchUserProfile(uid));

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: profile,
            type: 'auth/setUser',
          });
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (getUserProfile as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "auth/setAuthError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(searchUserProfile(uid));
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

  describe('saveUserProfile', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      (postUserProfile as jest.Mock).mockReturnValueOnce(null);

      it('dispatch 액션이 "auth/setUser"인 타입과 profile 정보의 payload 이어야 한다', async () => {
        await store.dispatch(saveUserProfile(PROFILE_FIXTURE));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: PROFILE_FIXTURE,
          type: 'auth/setUser',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (postUserProfile as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "auth/setAuthError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(saveUserProfile(PROFILE_FIXTURE));
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
