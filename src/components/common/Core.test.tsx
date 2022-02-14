import { render } from '@testing-library/react';

import useGetUserToken from '@/hooks/api/auth/useGetUserToken';

import Core from './Core';

jest.mock('@/hooks/api/auth/useGetUserToken');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathName: '/',
  })),
}));
jest.mock('nextjs-progressbar');

describe('Core', () => {
  const renderCore = () => render((
    <Core />
  ));

  it('useGetUserToken가 호출되어야만 한다', () => {
    renderCore();

    expect(useGetUserToken).toBeCalledTimes(1);
  });
});
