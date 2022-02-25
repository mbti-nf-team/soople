import { fireEvent, render, screen } from '@testing-library/react';

import PROFILE_FIXTURE from '../../../fixtures/profile';

import UserNavbar from './UserNavbar';

describe('UserNavbar', () => {
  const renderUserNavbar = () => render((
    <UserNavbar
      signOut={jest.fn()}
      user={{
        ...PROFILE_FIXTURE,
        image: '',
      }}
    />
  ));

  it('"팀 모집하기" 링크가 나타나야만 한다', () => {
    renderUserNavbar();

    expect(screen.getByText('팀 모집하기')).toHaveAttribute('href', '/write');
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
