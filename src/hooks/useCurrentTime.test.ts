import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { tomorrow, yesterday } from '@/utils/utils';

import GROUP_FIXTURE from '../../fixtures/group';

import useCurrentTime from './useCurrentTime';

describe('useCurrentTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const useCurrentTimeHook = () => renderHook(() => useCurrentTime(given.group));

  afterEach(() => {
    jest.clearAllTimers();
  });

  context('group이 존재하지 않는 경우', () => {
    given('group', () => (undefined));

    it('딜레이가 없는 시간이 반환되어야 한다', async () => {
      const { result: { current } } = useCurrentTimeHook();

      const now = Date.now();

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect((current / 100).toFixed(0)).toBe((now / 100).toFixed(0));
    });
  });

  context('"isRecruitCompletedAndManual" 반환값이 true인 경우', () => {
    given('group', () => (GROUP_FIXTURE));

    it('딜레이가 없는 시간이 반환되어야 한다', async () => {
      const { result: { current } } = useCurrentTimeHook();

      const now = Date.now();

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect((current / 100).toFixed(0)).toBe((now / 100).toFixed(0));
    });
  });

  context('isRecruitCompletedAndManual"이 false인 경우', () => {
    context('현재 시간이 마감 시간 이전일 경우', () => {
      given('group', () => ({
        ...GROUP_FIXTURE,
        isCompleted: false,
        recruitmentEndSetting: 'automatic',
        recruitmentEndDate: tomorrow(new Date()),
      }));

      it('실시간 시간이 반환되어야 한다', async () => {
        const { result: { current } } = useCurrentTimeHook();

        const now = Date.now();

        await act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect((current / 100).toFixed(0)).toBe((now / 100).toFixed(0));
      });
    });

    context('현재 시간이 마감 시간 이후일 경우', () => {
      given('group', () => ({
        ...GROUP_FIXTURE,
        isCompleted: false,
        recruitmentEndSetting: 'automatic',
        recruitmentEndDate: yesterday(new Date()),
      }));

      it('딜레이가 없는 시간이 반환되어야 한다', async () => {
        const { result: { current } } = useCurrentTimeHook();

        const now = Date.now();

        await act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect((current / 100).toFixed(0)).toBe((now / 100).toFixed(0));
      });
    });
  });
});
