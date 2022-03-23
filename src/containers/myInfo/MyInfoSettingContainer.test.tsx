import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useAccountWithdrawal from '@/hooks/api/auth/useAccountWithdrawal';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';

import FIXTURE_PROFILE from '../../../fixtures/profile';

import MyInfoSettingContainer from './MyInfoSettingContainer';

jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/auth/useAccountWithdrawal');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MyInfoSettingContainer', () => {
  const mockReplace = jest.fn();
  const deleteMemberMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));

    (useFetchUserProfile as jest.Mock).mockImplementation(() => (given.profileStatus));
    (useAccountWithdrawal as jest.Mock).mockImplementation(() => ({
      mutate: deleteMemberMutate,
    }));
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

    describe('회원 탈퇴 모달창에서 "탈퇴하기" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderMyInfoSettingContainer();

        fireEvent.click(screen.getByText('회원 탈퇴하기'));
        fireEvent.click(screen.getByText('탈퇴하기'));

        expect(deleteMemberMutate).toBeCalled();
      });
    });
  });
});
