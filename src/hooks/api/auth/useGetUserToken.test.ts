import { useAuthIdToken } from '@react-query-firebase/auth';
import { renderHook } from '@testing-library/react-hooks';
import { IdTokenResult } from 'firebase/auth';
import { setCookie } from 'nookies';

import wrapper from '@/test/ReactQueryWrapper';
import { removeToken } from '@/utils/utils';

import useGetUserToken, { onGetTokenSuccess } from './useGetUserToken';

jest.mock('@react-query-firebase/auth');
jest.mock('@/utils/utils');
jest.mock('nookies', () => ({
  destroyCookie: jest.fn(),
  setCookie: jest.fn(),
}));

describe('useGetUserToken', () => {
  const useGetUserTokenHook = () => renderHook(() => useGetUserToken(), {
    wrapper,
  });

  beforeEach(() => {
    (useAuthIdToken as jest.Mock).mockImplementation(() => ('token'));
  });

  it('useAuthIdToken이 호출되어야만 한다', async () => {
    const { result, waitFor } = useGetUserTokenHook();

    await waitFor(() => !!result.current);

    expect(useAuthIdToken).toBeCalled();
  });
});

describe('onGetTokenSuccess', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('result가 null인 경우', () => {
    it('removeToken이 호출되어야만 한다', () => {
      onGetTokenSuccess(null);

      expect(removeToken).toBeCalled();
    });
  });

  context('result에 token이 존재하는 경우', () => {
    it('setCookie가 빈문자열과 함께 호출되어야만 한다', () => {
      onGetTokenSuccess({
        token: 'token',
      } as IdTokenResult);

      expect(setCookie).toBeCalledWith(null, 'token', 'token', { path: '/' });
    });
  });
});
