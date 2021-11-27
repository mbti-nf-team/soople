import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import rootReducer from './rootReducer';
import { AppState } from './store';

describe('rootReducer', () => {
  const initialAuth: AppState = {
    authReducer: {
      auth: null,
      authError: null,
      user: null,
      isRegister: false,
    },
  };

  context('action type이 HYDRATE일 때', () => {
    const action: AnyAction = {
      type: HYDRATE,
      payload: {
        auth: 'test',
      },
    };

    it('추가된 상태가 나타나야 한다', () => {
      const result = rootReducer(initialAuth, action);

      expect(result).toEqual({
        ...initialAuth,
        auth: 'test',
      });
    });
  });

  context('action type이 HYDRATE가 아닐 때', () => {
    const action: AnyAction = {
      type: 'test',
      payload: {
        auth: 'test',
      },
    };

    it('리듀서 store가 그대로인 상태로 반환해야 한다', () => {
      const result = rootReducer(initialAuth, action);

      expect(result).toEqual(initialAuth);
    });
  });
});
