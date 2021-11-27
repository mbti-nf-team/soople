import { AuthStore } from '@/reducers/authSlice';

import { getAuth, isProdLevel, stringToExcludeNull } from './utils';

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

describe('stringToExcludeNull', () => {
  context('undefined일 경우', () => {
    it('빈 문자열을 반환야만 한다', () => {
      const result = stringToExcludeNull();

      expect(result).toBe('');
    });
  });

  context('null일 경우', () => {
    it('빈 문자열을 반환야만 한다', () => {
      const result = stringToExcludeNull(null);

      expect(result).toBe('');
    });
  });

  context('문자열일 경우', () => {
    it('빈 문자열을 반환야만 한다', () => {
      const result = stringToExcludeNull('');

      expect(result).toBe('');
    });
  });
});
