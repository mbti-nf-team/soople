import { getAuth, isProdLevel } from './utils';

describe('isProdLevel', () => {
  context('production일 때', () => {
    it('true를 반환한다', () => {
      const result = isProdLevel('production');

      expect(result).toBeTruthy();
    });
  });

  context('development일 때', () => {
    it('false를 반환한다', () => {
      const result = isProdLevel('development');

      expect(result).toBeFalsy();
    });
  });
});

test('getAuth', () => {
  const state = {
    authReducer: {
      auth: 'auth',
      authError: 'error',
      user: 'test',
    },
  };

  const user = getAuth('user');
  const auth = getAuth('auth');
  const authError = getAuth('authError');

  expect(user(state)).toBe('test');
  expect(auth(state)).toBe('auth');
  expect(authError(state)).toBe('error');
});
