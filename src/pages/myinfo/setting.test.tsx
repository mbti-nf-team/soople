import { act, render } from '@testing-library/react';

import useAuthRedirectResult from '@/hooks/api/auth/useAuthRedirectResult';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import SettingPage, { getServerSideProps } from './setting.page';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/auth/useAuthRedirectResult');
jest.mock('@/services/serverSideProps/authenticatedServerSideProps');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
}));

describe('SettingPage', () => {
  beforeEach(() => {
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      isSuccess: true,
    }));

    (useAuthRedirectResult as jest.Mock).mockImplementation(() => ({
      data: null,
    }));
  });

  const renderSettingPage = () => render((
    <ReactQueryWrapper>
      <SettingPage />
    </ReactQueryWrapper>
  ));

  it('내 정보 수정 페이지에 대한 내용이 보여야만 한다', async () => {
    const { container } = renderSettingPage();

    await act(() => expect(container).toHaveTextContent('저장하기'));
  });
});

describe('getServerSideProps', () => {
  it('authenticatedServerSideProps 함수를 반환해야만 한다', () => {
    const result = getServerSideProps;

    expect(result).toBe(authenticatedServerSideProps);
  });
});
