import { renderHook, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import { postSignOut } from '@/services/api/auth';
import { loadItem, removeItem } from '@/services/storage';
import wrapper from '@/test/ReactQueryWrapper';

import useCheckSignUp from './useCheckSignUp';

jest.mock('@/services/api/auth');
jest.mock('@/services/storage');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useCheckSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (postSignOut as jest.Mock).mockResolvedValue(null);
    (loadItem as jest.Mock).mockImplementation(() => false);
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: given.pathname,
    }));
  });

  const useCheckSignUpHook = () => renderHook(() => useCheckSignUp(), {
    wrapper,
  });

  context('pathname이 /signup이 아니고 isSignUp이 false인 경우', () => {
    given('pathname', () => '/');

    it('postSignOut이 호출되어야만 한다', async () => {
      const { result } = useCheckSignUpHook();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(postSignOut).toBeCalled();
      expect(removeItem).toBeCalledWith('isSignUp');
    });
  });

  context('pathname이 /signup이거나 isSignUp이 false가 아닌 경우', () => {
    given('pathname', () => '/signup');

    it('postSignOut는 호출되지 않아야만 한다', async () => {
      useCheckSignUpHook();

      expect(postSignOut).not.toBeCalled();
      expect(removeItem).not.toBeCalled();
    });
  });
});
