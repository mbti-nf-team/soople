import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import MyInfoSettingContainer from './MyInfoSettingContainer';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MyInfoSettingContainer', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    mockReplace.mockClear();

    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));

    (useFetchUserProfile as jest.Mock).mockImplementation(() => (given.profileStatus));
  });

  const renderMyInfoSettingContainer = () => render((
    <MyInfoSettingContainer />
  ));

  context('로딩중인 경우', () => {
    given('profileStatus', () => ({
      data: null,
      isLoading: true,
      isSuccess: false,
    }));

    it('"로딩중..."문구가 나타나야만 한다', () => {
      const { container } = renderMyInfoSettingContainer();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  context('로그인이 안된 사용자인 경우', () => {
    given('profileStatus', () => ({
      data: null,
      isLoading: false,
      isSuccess: true,
    }));

    it('replace가 "/?error=unauthenticated"와 함께 호출되어야만 한다', () => {
      renderMyInfoSettingContainer();

      expect(mockReplace).toBeCalledWith('/?error=unauthenticated');
    });
  });

  context('로그인한 사용자인 경우', () => {
    given('profileStatus', () => ({
      data: FIXTURE_PROFILE,
      isLoading: false,
      isSuccess: true,
    }));

    it('내 정보 수정 페이지에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderMyInfoSettingContainer();

      expect(container).toHaveTextContent(`${FIXTURE_PROFILE.position}`);
    });
  });
});
