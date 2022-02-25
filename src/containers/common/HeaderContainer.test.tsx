import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useSignOut from '@/hooks/api/auth/useSignOut';
import palette from '@/styles/palette';

import PROFILE_FIXTURE from '../../../fixtures/profile';

import HeaderContainer from './HeaderContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('recoil');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/auth/useSignOut');

describe('HeaderContainer', () => {
  const mutate = jest.fn();
  const setSignInModalVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSignOut as jest.Mock).mockImplementation(() => ({ mutate }));
    (useSetRecoilState as jest.Mock).mockImplementation(() => setSignInModalVisible);
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/',
    }));
  });

  const renderHeaderContainer = () => render((
    <HeaderContainer />
  ));

  describe('스크롤 위치에 따라 스타일이 변경된다', () => {
    given('user', () => (null));

    context('스크롤 위치가 최상단일 경우', () => {
      it('box-shadow가 "transparent"가 되어야 한다', () => {
        renderHeaderContainer();

        expect(screen.getByTestId('header-block')).toHaveStyle({
          'box-shadow': '0 1px 0 0 transparent',
        });
      });
    });

    context('스크롤 위치가 최상단이 아닐 경우', () => {
      it(`box-shadow 속성이 ${palette.accent2} 이어야 한다`, () => {
        renderHeaderContainer();

        fireEvent.scroll(window, { target: { scrollY: 200 } });

        expect(screen.getByTestId('header-block')).toHaveStyle({
          'box-shadow': `0 1px 0 0 ${palette.accent2}`,
        });
      });
    });
  });

  context('로그인한 경우', () => {
    given('user', () => ({
      ...PROFILE_FIXTURE,
      image: '',
    }));

    it('"팀 모집하기" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('팀 모집하기');
    });

    describe('"로그아웃" 버튼을 클릭한다', () => {
      it('signOut 액션이 호출되어야만 한다', () => {
        renderHeaderContainer();

        fireEvent.click(screen.getByTestId('default-profile-icon'));
        fireEvent.click(screen.getByText('로그아웃'));

        expect(mutate).toBeCalled();
      });
    });
  });

  context('로그인하지 않은 경우', () => {
    given('user', () => (null));

    describe('"시작하기" 버튼을 클릭한다', () => {
      it('setSignInModalVisible 액션이 true와 함께 호출되어야만 한다', () => {
        renderHeaderContainer();

        fireEvent.click(screen.getByText('시작하기'));

        expect(setSignInModalVisible).toBeCalledWith(true);
      });
    });
  });
});
