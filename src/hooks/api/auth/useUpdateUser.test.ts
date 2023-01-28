import { act, renderHook, waitFor } from '@testing-library/react';

import { updateUserProfile } from '@/services/api/auth';
import wrapper from '@/test/ReactQueryWrapper';

import PROFILE_FIXTURE from '../../../../fixtures/profile';

import useUpdateUser from './useUpdateUser';

jest.mock('@/services/api/auth');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useUpdateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (updateUserProfile as jest.Mock).mockResolvedValue(null);
  });

  const useUpdateUserHook = () => renderHook(() => useUpdateUser(), {
    wrapper,
  });

  it('updateUserProfile가 호출해야만 한다', async () => {
    const { result } = useUpdateUserHook();

    await act(async () => {
      await result.current.mutate(PROFILE_FIXTURE);
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(updateUserProfile).toHaveBeenCalledWith(PROFILE_FIXTURE);
  });
});
