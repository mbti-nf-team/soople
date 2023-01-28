import { act, renderHook } from '@testing-library/react';

import useThrottleCallback from './useThrottleCallback';

describe('useThrottleCallback', () => {
  const delay = 200;
  const callback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const useThrottleCallbackHook = () => renderHook(() => useThrottleCallback(callback, delay));

  context('delay 시간이 되지 않은 경우', () => {
    it('callback 함수가 호출되지 않아야만 한다', async () => {
      const { result } = useThrottleCallbackHook();

      await act(() => {
        result.current();
        jest.advanceTimersByTime(100);
      });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  context('delay 시간이 된 경우', () => {
    it('callback 함수가 호출되어야만 한다', async () => {
      const { result } = useThrottleCallbackHook();

      await act(() => {
        result.current();
        jest.advanceTimersByTime(delay);
      });

      expect(callback).toHaveBeenCalled();
    });
  });
});
