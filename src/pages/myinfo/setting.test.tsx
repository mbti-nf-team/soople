import { render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';

import SettingPage from './setting.page';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
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
  });

  const renderSettingPage = () => render((
    <SettingPage />
  ));

  it('내 정보 수정 페이지에 대한 내용이 보여야만 한다', () => {
    const { container } = renderSettingPage();

    expect(container).toHaveTextContent('저장하기');
  });
});
