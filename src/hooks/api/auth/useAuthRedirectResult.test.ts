import { renderHook, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import { getAuthRedirectResult } from '@/services/api/auth';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_PROFILE from '../../../../fixtures/profile';

import useAuthRedirectResult from './useAuthRedirectResult';
import useFetchUserProfile from './useFetchUserProfile';

jest.mock('@/services/api/auth');
jest.mock('./useFetchUserProfile');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useAuthRedirectResult', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: given.profile,
      isSuccess: true,
    }));
    (getAuthRedirectResult as jest.Mock).mockImplementation(() => FIXTURE_PROFILE);
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
  });

  const useAuthRedirectResultHook = () => renderHook(() => useAuthRedirectResult(), {
    wrapper,
  });

  context('isSuccess가 true이고 user 정보는 존재하지만, profile 정보가 존재하지 않는 경우', () => {
    given('profile', () => null);

    it('"/signup"과 함께 router.push가 호출되어야만 한다', async () => {
      const { result } = useAuthRedirectResultHook();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(getAuthRedirectResult).toBeCalled();
      expect(mockPush).toBeCalledWith('/signup');
    });
  });

  context('isSuccess가 false이거나 user 정보가 존재하지 않거나, profile 정보가 존재하는 경우', () => {
    given('profile', () => FIXTURE_PROFILE);

    it('router.push가 호출되지 않아야만 한다', async () => {
      const { result } = useAuthRedirectResultHook();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(mockPush).not.toBeCalled();
    });
  });
});
