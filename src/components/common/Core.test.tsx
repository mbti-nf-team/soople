import { render } from '@testing-library/react';

import useGetUserToken from '@/hooks/api/auth/useGetUserToken';

import Core from './Core';

jest.mock('@/hooks/api/auth/useGetUserToken');
jest.mock('@/hooks/api/auth/useRefreshToken');
jest.mock('@/hooks/api/auth/useAuthRedirectResult');
jest.mock('@/hooks/api/auth/useCheckSignUp');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathName: '/',
  })),
}));
jest.mock('nextjs-progressbar', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('Core', () => {
  const renderCore = () => render((
    <Core />
  ));

  it('useGetUserToken가 호출되어야만 한다', () => {
    renderCore();

    expect(useGetUserToken).toBeCalledTimes(3);
  });
});
