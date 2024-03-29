import { useRouter } from 'next/router';

import { act, renderHook, waitFor } from '@testing-library/react';

import { postSignOut } from '@/services/api/auth';
import wrapper from '@/test/ReactQueryWrapper';

import useSignOut from './useSignOut';

jest.mock('@/services/api/auth');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useSignOut', () => {
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (postSignOut as jest.Mock).mockResolvedValue(null);
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace,
    }));
  });

  const useSignOutHook = () => renderHook(() => useSignOut(), {
    wrapper,
  });

  it('replace가 "/"와 함께 호출해야만 한다', async () => {
    const { result } = useSignOutHook();

    await act(async () => {
      await result.current.mutate();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(postSignOut).toHaveBeenCalled();
    expect(replace).toHaveBeenCalledWith('/', undefined, { shallow: true });
  });
});
