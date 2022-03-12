import { act, renderHook } from '@testing-library/react-hooks';

import { patchAlarmViewed } from '@/services/api/alarm';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_ALARM from '../../../../fixtures/alarm';

import useUpdateAlarmViewed, { updateAlarms } from './useUpdateAlarmViewed';

jest.mock('@/services/api/alarm');

describe('useUpdateAlarmViewed', () => {
  const useUpdateAlarmViewedHook = () => renderHook(() => useUpdateAlarmViewed(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (patchAlarmViewed as jest.Mock).mockImplementation(() => (null));
  });

  it('patchAlarmViewed가 호출되어야만 한다', async () => {
    const { result } = useUpdateAlarmViewedHook();

    await act(async () => {
      await result.current.mutate('alarmUid');
    });

    expect(result.current.isSuccess).toBeTruthy();
    expect(patchAlarmViewed).toBeCalledTimes(1);
  });
});

describe('updateAlarms', () => {
  const alarms = [FIXTURE_ALARM];

  context('alarm.uid가 같은 경우', () => {
    it('alarm가 변경되어야만 한다', () => {
      const result = updateAlarms('1')(alarms);

      expect(result).toEqual([{
        ...FIXTURE_ALARM,
        isViewed: true,
      }]);
    });
  });

  context('alarm.uid가 다른 경우', () => {
    it('alarm가 변경되지 않은 채로 반환해야만 한다', () => {
      const result = updateAlarms('2')(alarms);

      expect(result).toEqual(alarms);
    });
  });
});
