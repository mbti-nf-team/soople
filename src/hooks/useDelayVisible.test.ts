import { act, renderHook } from '@testing-library/react';

import useDelayVisible from './useDelayVisible';

describe('useDelayVisible', () => {
  const delay = 200;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const useDelayVisibleHook = () => renderHook(() => useDelayVisible(given.isVisible, delay));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    it('true를 반환해야만 한다', () => {
      const { result } = useDelayVisibleHook();

      expect(result.current).toBeTruthy();
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it(`${delay}시간 뒤에 false를 반환해야만 한다`, async () => {
      const { result } = useDelayVisibleHook();

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      expect(result.current).toBeFalsy();
    });
  });
});
