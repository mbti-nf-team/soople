import { fireEvent, render, screen } from '@testing-library/react';

import useFetchAlertAlarms from '@/hooks/api/alarm/useFetchAlertAlarms';
import InjectMockProviders from '@/test/InjectMockProviders';

import PROFILE_FIXTURE from '../../../fixtures/profile';

import UserNavbar from './UserNavbar';

jest.mock('@/hooks/api/alarm/useFetchAlertAlarms');

describe('UserNavbar', () => {
  beforeEach(() => {
    (useFetchAlertAlarms as jest.Mock).mockImplementation(() => ({
      data: given.alertAlarms || [],
    }));
  });

  const renderUserNavbar = () => render((
    <InjectMockProviders width={given.width}>
      <UserNavbar
        signOut={jest.fn()}
        user={{
          ...PROFILE_FIXTURE,
          image: '',
        }}
      />
    </InjectMockProviders>
  ));

  it('"팀 모집하기" 링크가 나타나야만 한다', () => {
    renderUserNavbar();

    expect(screen.getByText('팀 모집하기')).toHaveAttribute('href', '/write');
  });

  context('읽지 않은 알람이 존재하는 경우', () => {
    given('alertAlarms', () => [1, 2, 3]);

    context('모바일인 경우', () => {
      given('width', () => 400);

      it('알람 상태가 나타나야만 한다', () => {
        const { container } = renderUserNavbar();

        expect(container).toHaveTextContent('3');
        expect(screen.getByTestId('mobile-alarm-status')).toBeInTheDocument();
      });
    });

    context('모바일이 아닌 경우', () => {
      given('width', () => 700);

      it('알람 상태가 나타나야만 한다', () => {
        const { container } = renderUserNavbar();

        expect(container).toHaveTextContent('3');
        expect(screen.getByTestId('alarm-status')).toBeInTheDocument();
      });
    });
  });

  context('dropdown 메뉴가 보이지 않는 경우', () => {
    describe('프로필 이미지를 클릭한다', () => {
      it('dropdown 메뉴가 나타나야만 한다', () => {
        const { container } = renderUserNavbar();

        expect(container).not.toHaveTextContent('로그아웃');

        fireEvent.click(screen.getByTestId('default-profile-icon'));

        expect(container).toHaveTextContent('로그아웃');
      });
    });
  });

  context('dropdown 메뉴가 보이는 경우', () => {
    describe('dropdown 밖에 부분을 클릭한다', () => {
      it('dropdown 메뉴가 사라져야만 한다', () => {
        const { container } = renderUserNavbar();

        fireEvent.click(screen.getByTestId('default-profile-icon'));

        fireEvent.mouseDown(document);

        expect(container).not.toHaveTextContent('로그아웃');
      });
    });

    describe('스크롤이 액션이 일어난다', () => {
      it('dropdown 메뉴가 사라져야만 한다', () => {
        const { container } = renderUserNavbar();

        fireEvent.click(screen.getByTestId('default-profile-icon'));

        fireEvent.scroll(document);

        expect(container).not.toHaveTextContent('로그아웃');
      });
    });

    describe('dropdown 메뉴 안 "로그아웃" 버튼을 클릭한다', () => {
      it('dropdown는 사라지지 않아야 한다', () => {
        const { container } = renderUserNavbar();

        fireEvent.click(screen.getByTestId('default-profile-icon'));

        fireEvent.mouseDown(screen.getByText('로그아웃'));

        expect(container).toHaveTextContent('로그아웃');
      });
    });
  });
});
