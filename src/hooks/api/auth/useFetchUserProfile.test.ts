import { renderHook } from '@testing-library/react-hooks';

import { getUserProfile } from '@/services/api/auth';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_PROFILE from '../../../../fixtures/profile';

import useFetchUserProfile from './useFetchUserProfile';

jest.mock('@/services/api/auth');

describe('useFetchUserProfile', () => {
  const useFetchUserProfileHook = () => renderHook(() => useFetchUserProfile('userUid'), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (getUserProfile as jest.Mock).mockImplementation(() => (FIXTURE_PROFILE));
  });

  it('user에 대한 profile 정보를 반환해야만 한다', async () => {
    const { result, waitFor } = useFetchUserProfileHook();

    await waitFor(() => !!result.current.data);

    expect(result.current.data).toEqual(FIXTURE_PROFILE);
  });
});
