import { RootReducerState } from '@/reducers/rootReducer';

import GROUP_FIXTURE from '../../fixtures/group';
import WRITE_FIELDS_FIXTURE from '../../fixtures/writeFields';

import {
  emptyAThenB,
  getAuth,
  getGroup,
  isCurrentTimeBeforeEndDate,
  isProdLevel,
  isRecruitCompletedAndManual,
  isRecruiting,
  stringToExcludeNull,
  tomorrow,
  yesterday,
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
    const value = 'value';

    it('문자열을 반환야만 한다', () => {
      const result = stringToExcludeNull(value);

      expect(result).toBe(value);
    });
  });
});

describe('emptyAThenB', () => {
  const b = 'B';

  context('null일 경우', () => {
    it('첫 번째 인자를 반환야만 한다', () => {
      const result = emptyAThenB(b, null);

      expect(result).toBe(b);
    });
  });

  context('문자열일 경우', () => {
    const a = 'test';

    it('두 번째 인자를 반환야만 한다', () => {
      const result = emptyAThenB(b, a);

      expect(result).toBe(a);
    });
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

describe('isCurrentTimeBeforeEndDate', () => {
  context('현재 시간보다 이후 시간일 경우', () => {
    it('true를 반환해야만 한다', () => {
      const result = isCurrentTimeBeforeEndDate(tomorrow(new Date()), Date.now());

      expect(result).toBeTruthy();
    });
  });

  context('현재 시간보다 이전 시간일 경우', () => {
    it('false를 반환해야만 한다', () => {
      const result = isCurrentTimeBeforeEndDate(yesterday(new Date()), Date.now());

      expect(result).toBeFalsy();
    });
  });
});

describe('isRecruiting', () => {
  context('"recruitmentEndSetting"는 "manual"이고 "recruitmentEndDate"는 존재하지 않을 경우', () => {
    it('true를 반환해야만 한다', () => {
      const result = isRecruiting(GROUP_FIXTURE, Date.now());

      expect(result).toBeTruthy();
    });
  });

  context('"recruitmentEndSetting"는 "automatic"이고 현재 시간보다 이전 시간일 경우', () => {
    it('false를 반환해야만 한다', () => {
      const result = isRecruiting({
        ...GROUP_FIXTURE,
        recruitmentEndDate: '2021-11-11',
        recruitmentEndSetting: 'automatic',
      }, Date.now());

      expect(result).toBeFalsy();
    });
  });

  context('"recruitmentEndSetting"는 "automatic"이고 현재 시간보다 이후 시간일 경우', () => {
    it('true를 반환해야만 한다', () => {
      const result = isRecruiting({
        ...GROUP_FIXTURE,
        recruitmentEndDate: tomorrow(new Date()),
        recruitmentEndSetting: 'automatic',
      }, Date.now());

      expect(result).toBeTruthy();
    });
  });
});

describe('isRecruitCompletedAndManual', () => {
  context('"isCompleted"가 true인 경우', () => {
    it('true를 반환해야만 한다', () => {
      const result = isRecruitCompletedAndManual({
        ...GROUP_FIXTURE,
        isCompleted: true,
      });

      expect(result).toBeTruthy();
    });
  });

  context('"recruitmentEndSetting"는 "manual"이고 "recruitmentEndDate"는 존재하지 않을 경우', () => {
    it('true를 반환해야만 한다', () => {
      const result = isRecruitCompletedAndManual(GROUP_FIXTURE);

      expect(result).toBeTruthy();
    });
  });

  context('"recruitmentEndSetting"는 "automatic"이고 "isCompleted"가 false인 경우', () => {
    it('false를 반환해야만 한다', () => {
      const result = isRecruitCompletedAndManual({
        ...GROUP_FIXTURE,
        isCompleted: false,
        recruitmentEndDate: tomorrow(new Date()),
        recruitmentEndSetting: 'automatic',
      });

      expect(result).toBeFalsy();
    });
  });
});
