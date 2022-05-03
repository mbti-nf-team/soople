import { renderHook, waitFor } from '@testing-library/react';

import { getUserProfile } from '@/services/api/auth';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_PROFILE from '../../../../fixtures/profile';

import useFetchUserProfile from './useFetchUserProfile';
import useGetUser from './useGetUser';

jest.mock('@/services/api/auth');
jest.mock('./useGetUser');
jest.mock('@/services/firebase', () => ({
  firebaseAuth: {
    currentUser: {
      uid: 'uid',
    },
  },
}));

describe('useFetchUserProfile', () => {
  const useFetchUserProfileHook = () => renderHook(() => useFetchUserProfile(), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
      isLoading: given.isLoading,
    }));
    (getUserProfile as jest.Mock).mockImplementation(() => (given.user));
  });

  context('user가 존재하는 경우', () => {
    given('user', () => FIXTURE_PROFILE);
    given('isLoading', () => false);

    it('user에 대한 profile 정보를 반환해야만 한다', async () => {
      const { result } = useFetchUserProfileHook();

      await waitFor(() => expect(result.current.data).toEqual(FIXTURE_PROFILE));
    });
  });

  context('user가 존재하지 않는 경우', () => {
    given('user', () => null);
    given('isLoading', () => true);

    it('user에 대한 profile 정보를 반환해야만 한다', async () => {
      const { result } = useFetchUserProfileHook();

      await waitFor(() => expect(result.current.data).toEqual(null));
    });
  });
});
