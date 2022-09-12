import { act, fireEvent, renderHook } from '@testing-library/react';

import useLessThenScrollY from './useLessThenScrollY';

describe('useLessThenScrollY', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const useLessThenScrollYHook = () => renderHook(() => useLessThenScrollY(given.scrollY));

  context('스크롤 위치가 기준값보다 작거나 같은 경우', () => {
    const scrollY = 50;

    given('scrollY', () => scrollY);

    it('true를 반환해야만 한다', async () => {
      const { result } = useLessThenScrollYHook();

      await act(async () => {
        fireEvent.scroll(window, { target: { scrollY } });
        jest.advanceTimersByTime(200);
      });

      expect(result.current).toBeTruthy();
    });
  });

  context('스크롤 위치가 기준값보다 큰 경우', () => {
    it('false를 반환해야만 한다', async () => {
      const { result } = useLessThenScrollYHook();

      await act(async () => {
        fireEvent.scroll(window, { target: { scrollY: 200 } });
        jest.advanceTimersByTime(200);
      });

      expect(result.current).toBeFalsy();
    });
  });
});
