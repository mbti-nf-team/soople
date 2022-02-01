/* eslint-disable import/no-extraneous-dependencies */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  getUserProfile, postSignIn, postSignOut, postUserProfile,
} from '@/services/api/auth';

import PROFILE_FIXTURE from '../../fixtures/profile';

import reducer, {
  AuthStore,
  clearAuth,
  loadUserProfile,
  requestSignIn,
  requestSignOut,
  requestUserProfile,
  setAuth,
  setAuthError,
  setUser,
} from './authSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('@/services/api/auth');

describe('authReducer', () => {
  const initialState: AuthStore = {
    user: null,
    auth: null,
    authError: null,
    isVisible: false,
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

  describe('clearAuth', () => {
    it('"auth", "isRegister", "authError"가 초기화되어야만 한다', () => {
      const state = reducer({
        ...initialState,
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

  let store: any;

  describe('requestUserProfile', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      (postUserProfile as jest.Mock).mockReturnValueOnce(null);

      it('dispatch 액션이 "auth/setUser"인 타입과 profile 정보의 payload 이어야 한다', async () => {
        await store.dispatch(requestUserProfile(PROFILE_FIXTURE));

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
          await store.dispatch(requestUserProfile(PROFILE_FIXTURE));
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

  describe('requestSignOut', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      (postSignOut as jest.Mock).mockReturnValueOnce(null);

      it('dispatch 액션이 "auth/clearAuth"인 타입이어야 한다', async () => {
        await store.dispatch(requestSignOut());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: undefined,
          type: 'auth/clearAuth',
        });
        expect(actions[1]).toEqual({
          payload: null,
          type: 'auth/setUser',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (postSignOut as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "auth/setAuthError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(requestSignOut());
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

  describe('loadUserProfile', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    context('에러가 발생하지 않는 경우', () => {
      (getUserProfile as jest.Mock).mockReturnValueOnce(PROFILE_FIXTURE);

      it('dispatch 액션이 "auth/clearAuth"인 타입이어야 한다', async () => {
        await store.dispatch(loadUserProfile('userId'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: PROFILE_FIXTURE,
          type: 'auth/setUser',
        });
      });
    });

    context('에러가 발생하는 경우', () => {
      (getUserProfile as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "auth/setAuthError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(loadUserProfile('userId'));
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

  describe('requestSignIn', () => {
    beforeEach(() => {
      (postSignIn as jest.Mock).mockClear();
      store = mockStore({});
    });

    context('에러가 발생하는 경우', () => {
      (postSignIn as jest.Mock).mockImplementationOnce(() => {
        throw new Error('error');
      });

      it('dispatch 액션이 "auth/setAuthError"인 타입과 오류 메시지 payload 이어야 한다', async () => {
        try {
          await store.dispatch(requestSignIn());
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

    context('에러가 발생하지 않는 경우', () => {
      context('"postSignIn"의 반환 값이 존재하지 않는 경우', () => {
        (postSignIn as jest.Mock).mockReturnValueOnce(null);

        it('dispatch actions는 undefined여야만 한다', async () => {
          await store.dispatch(requestSignIn());

          const actions = store.getActions();

          expect(actions).toEqual([]);
        });
      });

      context('"postSignIn"의 반환 값이 존재하는 경우', () => {
        const {
          uid, email, name, image,
        } = PROFILE_FIXTURE;

        beforeEach(() => {
          (postSignIn as jest.Mock).mockReturnValueOnce({
            uid,
            displayName: name,
            email,
            photoURL: image,
          });
        });

        context('"getUserProfile"반환 값이 존재하는 경우', () => {
          (getUserProfile as jest.Mock).mockReturnValueOnce(PROFILE_FIXTURE);

          it('dispatch 액션이 "auth/setUser"인 타입이어야만 한다', async () => {
            await store.dispatch(requestSignIn());

            const actions = store.getActions();

            expect(actions[0]).toEqual({
              payload: PROFILE_FIXTURE,
              type: 'auth/setUser',
            });
          });
        });

        context('"getUserProfile"반환 값이 존재하지 않는 경우', () => {
          (getUserProfile as jest.Mock).mockReturnValueOnce(null);

          it('dispatch 액션이 "auth/setAuth"인 타입이어야만 한다', async () => {
            await store.dispatch(requestSignIn());

            const actions = store.getActions();

            expect(actions[0]).toEqual({
              payload: {
                uid, email, name, image,
              },
              type: 'auth/setAuth',
            });
          });
        });
      });
    });
  });
});
