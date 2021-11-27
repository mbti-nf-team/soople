import { AuthStore } from '@/reducers/authSlice';

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
      auth: {
        email: 'email',
      },
      authError: 'error',
      user: {
        email: 'email',
      },
    } as AuthStore,
  };

  const user = getAuth('user');
  const auth = getAuth('auth');
  const authError = getAuth('authError');

  expect(user(state)).toEqual({ email: 'email' });
  expect(auth(state)).toEqual({ email: 'email' });
  expect(authError(state)).toBe('error');
});
