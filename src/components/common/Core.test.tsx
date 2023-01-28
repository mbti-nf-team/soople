import { render, screen } from '@testing-library/react';

import useGetUserToken from '@/hooks/api/auth/useGetUserToken';
import InjectResponsiveContext from '@/test/InjectResponsiveContext';
import MockTheme from '@/test/MockTheme';
import { errorToast } from '@/utils/toast';

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const MockRenderToast = () => {
    errorToast('토스트 렌더링');

    return (
      <>mock</>
    );
  };

  const renderCore = () => render((
    <InjectResponsiveContext width={given.width}>
      <MockTheme>
        <Core />
        <MockRenderToast />
      </MockTheme>
    </InjectResponsiveContext>
  ));

  it('useGetUserToken가 호출되어야만 한다', () => {
    renderCore();

    expect(useGetUserToken).toHaveBeenCalled();
  });

  context('모바일 환경 경우', () => {
    given('width', () => '400px');

    it('닫기 버튼이 안보여야만 한다', () => {
      renderCore();

      expect(screen.queryByTestId('close-icon')).toBeNull();
    });
  });

  context('모바일 환경이 아닌 경우', () => {
    given('width', () => '700px');

    it('닫기 버튼이 보여야만 한다', async () => {
      renderCore();

      await (await screen.findAllByTestId('close-icon')).forEach((closeIcon) => {
        expect(closeIcon).toBeInTheDocument();
      });
    });
  });
});
