/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { postSignInWithGoogle } from '@/services/api/auth';

import reducer, {
  AuthStore, requestSignInWithGoogle, setAuth, setAuthError,
} from './authSlice';
import { RootState } from './rootReducer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('@/services/api/auth');

describe('authReducer', () => {
  const initialState: AuthStore = {
    user: '',
    auth: '',
    authError: '',
  };

  context('previous state가 undefined일 때', () => {
    it('초기 상태 스토어가 반환되어야만 한다', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setAuth', () => {
    it('user 이메일이 반환되어야만 한다', () => {
      const userEmail = 'test@test.com';

      const { auth } = reducer(initialState, setAuth(userEmail));

      expect(auth).toBe(userEmail);
    });
  });

  describe('setAuthError', () => {
    it('authError에 error가 존재해야만 한다', () => {
      const error = '에러!';

      const { authError } = reducer(initialState, setAuthError(error));

      expect(authError).toBe(error);
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
        (postSignInWithGoogle as jest.Mock).mockReturnValueOnce({
          email: 'test.com',
        });

        it('dispatch 액션이 "auth/setAuth"인 타입과 null이 아닌 payload 이어야 한다', async () => {
          await store.dispatch(requestSignInWithGoogle());

          const actions = store.getActions();

          expect(actions[0]).toEqual({
            payload: 'test.com',
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
});
