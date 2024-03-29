import { useRouter } from 'next/router';

import { act, renderHook, waitFor } from '@testing-library/react';

import { deleteMember } from '@/services/api/auth';
import wrapper from '@/test/ReactQueryWrapper';

import useAccountWithdrawal from './useAccountWithdrawal';

jest.mock('@/services/api/auth');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useAccountWithdrawal', () => {
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (deleteMember as jest.Mock).mockResolvedValue(null);
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace,
    }));
  });

  const useAccountWithdrawalHook = () => renderHook(() => useAccountWithdrawal(), {
    wrapper,
  });

  it('replace가 "/"와 함께 호출해야만 한다', async () => {
    const { result } = useAccountWithdrawalHook();

    await act(async () => {
      await result.current.mutate();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(deleteMember).toHaveBeenCalled();
    expect(replace).toHaveBeenCalledWith('/');
  });
});
