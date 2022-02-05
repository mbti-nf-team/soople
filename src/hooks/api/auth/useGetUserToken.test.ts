import { useAuthIdToken } from '@react-query-firebase/auth';
import { renderHook } from '@testing-library/react-hooks';
import { IdTokenResult } from 'firebase/auth';
import nookies from 'nookies';

import wrapper from '@/test/ReactQueryWrapper';

import useGetUserToken, { onGetTokenSuccess } from './useGetUserToken';

jest.mock('@react-query-firebase/auth');
jest.mock('nookies');

describe('useGetUserToken', () => {
  const useGetUserTokenHook = () => renderHook(() => useGetUserToken(), {
    wrapper,
  });

  beforeEach(() => {
    (useAuthIdToken as jest.Mock).mockImplementation(() => (null));
  });

  it('useAuthIdToken이 호출되어야만 한다', async () => {
    const { result, waitFor } = useGetUserTokenHook();

    await waitFor(() => result.current);

    expect(useAuthIdToken).toBeCalled();
  });
});

describe('onGetTokenSuccess', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('result가 null인 경우', () => {
    it('nookies.set이 빈문자열과 함께 호출되어야만 한다', () => {
      onGetTokenSuccess(null);

      expect(nookies.set).toBeCalledWith(null, 'token', '', { path: '/' });
    });
  });

  context('result에 token이 존재하는 경우', () => {
    it('nookies.set이 빈문자열과 함께 호출되어야만 한다', () => {
      onGetTokenSuccess({
        token: 'token',
      } as IdTokenResult);

      expect(nookies.set).toBeCalledWith(null, 'token', 'token', { path: '/' });
    });
  });
});
