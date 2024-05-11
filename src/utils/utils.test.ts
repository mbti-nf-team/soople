import { setCookie } from 'nookies';

import GROUP_FIXTURE from '../../fixtures/group';

import {
  isCurrentTimeBeforeEndDate,
  isProdLevel,
  isRecruitCompletedAndManual,
  isRecruiting,
  removeToken,
  targetFalseThenValue,
  tomorrow,
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

describe('targetFalseThenValue', () => {
  const value = 'result';

  context('target이 false인 경우', () => {
    it('value를 그대로 반환해야만 한다', () => {
      const result = targetFalseThenValue(false)(value);

      expect(result).toBe(value);
    });
  });

  context('target이 true인 경우', () => {
    it('undefined를 반환해야만 한다', () => {
      const result = targetFalseThenValue(true)(value);

      expect(result).toBeUndefined();
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

    expect(setCookie).toHaveBeenCalledWith(null, 'token', '', { path: '/' });
  });
});
