import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useCurrentTime from './useCurrentTime';

describe('useCurrentTime', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const useCurrentTimeHook = () => renderHook(() => useCurrentTime());

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('실시간 시간이 반환되어야 한다', async () => {
    const { result: { current } } = useCurrentTimeHook();

    const now = Date.now();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect((current / 100).toFixed(0)).toBe((now / 100).toFixed(0));
  });
});
