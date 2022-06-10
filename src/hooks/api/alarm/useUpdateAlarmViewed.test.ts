import { act, renderHook } from '@testing-library/react';

import { patchAlarmViewed } from '@/services/api/alarm';
import wrapper from '@/test/ReactQueryWrapper';

import useUpdateAlarmViewed from './useUpdateAlarmViewed';

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
