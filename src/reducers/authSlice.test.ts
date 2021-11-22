import reducer, { AuthStore, setAuth } from './authSlice';

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
});
