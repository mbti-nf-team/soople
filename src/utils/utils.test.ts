import { setCookie } from 'nookies';

import GROUP_FIXTURE from '../../fixtures/group';

import {
  emptyAThenB,
  hasBackground,
  isCurrentTimeBeforeEndDate,
  isProdLevel,
  isRecruitCompletedAndManual,
  isRecruiting,
  removeToken,
  stringToExcludeNull,
  tomorrow,
  trueOrFalse,
  yesterday,
} from './utils';

jest.mock('nookies', () => ({
  setCookie: jest.fn(),
  destroyCookie: jest.fn(),
}));

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

describe('hasBackground', () => {
  context('pathname이 "/"이거나 "/404"이거나 "/500"인 경우', () => {
    it('true를 반환해야만 한다', () => {
      const result = hasBackground('/404');

      expect(result).toBeTruthy();
    });
  });

  context('pathname이 "/"이거나 "/404"이거나 "/500" 아닌 경우', () => {
    it('false를 반환해야만 한다', () => {
      const result = hasBackground('/detail');

      expect(result).toBeFalsy();
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

describe('removeToken', () => {
  it('token이 삭제되어야만 한다', () => {
    removeToken();

    expect(setCookie).toBeCalledWith(null, 'token', '', { path: '/' });
  });
});

describe('trueOrFalse', () => {
  context('falsy한 값이면', () => {
    it('false를 반환해야만 한다', () => {
      const result = trueOrFalse('');

      expect(result).toBe(false);
    });
  });

  context('truthy한 값이면', () => {
    it('true를 반환해야만 한다', () => {
      const result = trueOrFalse('test');

      expect(result).toBe(true);
    });
  });
});
