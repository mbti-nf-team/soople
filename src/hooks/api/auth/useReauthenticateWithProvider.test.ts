import { act, renderHook } from '@testing-library/react';

import { postReauthenticateWithProvider } from '@/services/api/auth';
import wrapper from '@/test/ReactQueryWrapper';

import useReauthenticateWithProvider from './useReauthenticateWithProvider';

jest.mock('@/services/api/auth');

describe('useReauthenticateWithProvider', () => {
  const useReauthenticateWithProviderHook = () => renderHook(useReauthenticateWithProvider, {
    wrapper,
  });

  it('postReauthenticateWithProvider가 호출되어야만 한다', async () => {
    const { result } = useReauthenticateWithProviderHook();

    await act(async () => {
      await result.current.mutate();
    });

    expect(postReauthenticateWithProvider).toHaveBeenCalledTimes(1);
  });
});
