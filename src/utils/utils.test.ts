import { RootReducerState } from '@/reducers/rootReducer';

import WRITE_FIELDS_FIXTURE from '../../fixtures/writeFields';

import {
  getAuth, getGroup, isProdLevel, stringToExcludeNull, timestampToString, tomorrow, yesterday,
} from './utils';

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
    },
    groupReducer: {
      writeFields: WRITE_FIELDS_FIXTURE,
      groupError: null,
    },
  } as RootReducerState;

  const user = getAuth('user');
  const auth = getAuth('auth');
  const authError = getAuth('authError');

  expect(user(state)).toEqual({ email: 'email' });
  expect(auth(state)).toEqual({ email: 'email' });
  expect(authError(state)).toBe('error');
});

test('getGroup', () => {
  const state = {
    authReducer: {
      auth: {
        email: 'email',
      },
      authError: 'error',
      user: {
        email: 'email',
      },
    },
    groupReducer: {
      writeFields: WRITE_FIELDS_FIXTURE,
      groupError: null,
    },
  } as RootReducerState;

  const groupError = getGroup('groupError');
  const writeFields = getGroup('writeFields');

  expect(groupError(state)).toBeNull();
  expect(writeFields(state)).toEqual(WRITE_FIELDS_FIXTURE);
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

describe('timestampToString', () => {
  const timestamp = {
    toDate: jest.fn().mockImplementationOnce(() => ({
      toString: jest.fn().mockReturnValueOnce('2021-11-11'),
    })),
  };

  it('날짜 형식으로 변경되어야만 한다', () => {
    const result = timestampToString(timestamp);

    expect(result).toBe('2021-11-11');
  });
});

describe('tomorrow', () => {
  it('내일 날짜를 반환해야만 한다', () => {
    const now = new Date();

    const result = tomorrow(new Date());

    now.setDate(now.getDate() + 1);

    expect(result).toBe(now.toString());
  });
});

describe('yesterday', () => {
  it('어제 날짜를 반환해야만 한다', () => {
    const now = new Date();

    const result = yesterday(new Date());

    now.setDate(now.getDate() - 1);

    expect(result).toBe(now.toString());
  });
});
