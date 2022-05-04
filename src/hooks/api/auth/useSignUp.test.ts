import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';

import { postUserProfile } from '@/services/api/auth';
import wrapper from '@/test/ReactQueryWrapper';

import PROFILE_FIXTURE from '../../../../fixtures/profile';

import useSignUp from './useSignUp';

jest.mock('@/services/api/auth');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useSignUp', () => {
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (postUserProfile as jest.Mock).mockResolvedValue(null);
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace,
    }));
  });

  const useSignUpHook = () => renderHook(() => useSignUp(), {
    wrapper,
  });

  it('replace가 "/"와 함께 호출해야만 한다', async () => {
    const { result } = useSignUpHook();

    await act(async () => {
      await result.current.mutate(PROFILE_FIXTURE);
    });

    expect(postUserProfile).toBeCalledWith(PROFILE_FIXTURE);
    expect(result.current.isSuccess).toBeTruthy();
    expect(replace).toBeCalledWith('/');
  });
});
