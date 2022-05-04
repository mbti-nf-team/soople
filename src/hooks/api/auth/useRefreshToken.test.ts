import { act, renderHook } from '@testing-library/react';

import { firebaseAuth } from '@/services/firebase';
import wrapper from '@/test/ReactQueryWrapper';

import useRefreshToken from './useRefreshToken';

describe('useRefreshToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const useRefreshTokenHook = () => renderHook(() => useRefreshToken(), {
    wrapper,
  });

  context('user가 존재하지 않는 경우', () => {
    beforeEach(() => {
      (firebaseAuth.currentUser as unknown as any) = null;
    });

    it('getIdToken이 호출되지 않아야만 한다', async () => {
      useRefreshTokenHook();

      await act(async () => {
        jest.advanceTimersByTime(10 * 60 * 1000);
      });

      expect(firebaseAuth.currentUser?.getIdToken).toBeUndefined();
    });
  });

  context('user가 존재하는 경우', () => {
    const getIdToken = jest.fn();

    beforeEach(() => {
      getIdToken.mockClear();

      (firebaseAuth.currentUser as unknown as any) = {
        getIdToken,
      };
    });

    it('10분마다 getIdToken이 호출되어야만 한다', async () => {
      useRefreshTokenHook();

      await act(async () => {
        jest.advanceTimersByTime(10 * 60 * 1000);
      });

      expect(getIdToken).toBeCalledTimes(1);
    });

    it('"getIdToken"이 호출되어야만 한다', async () => {
      const { result } = useRefreshTokenHook();

      await act(async () => {
        await result.current.mutate();
      });

      expect(getIdToken).toBeCalledTimes(1);
    });
  });
});
