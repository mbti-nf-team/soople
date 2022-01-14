import { fireEvent, render, screen } from '@testing-library/react';

import palette from '@/styles/palette';

import Header from './Header';

describe('Header', () => {
  const handleClick = jest.fn();

  const renderHeader = () => render((
    <Header
      signOut={jest.fn()}
      isScrollTop={given.isScrollTop}
      user={given.user}
      onClick={handleClick}
      isHome={given.isHome}
    />
  ));

  describe('홈인지 아닌지에 따라서 배경색이 변경된다', () => {
    context('Home인 경우', () => {
      given('isHome', () => true);

      it(`background 속성이 ${palette.accent1}이어야 한다`, () => {
        renderHeader();

        expect(screen.getByTestId('header-block')).toHaveStyle({
          background: palette.accent1,
        });
      });
    });

    context('Home이 아닌 경우', () => {
      given('isHome', () => false);

      it(`background 속성이 ${palette.background}이어야 한다`, () => {
        renderHeader();

        expect(screen.getByTestId('header-block')).toHaveStyle({
          background: palette.background,
        });
      });
    });
  });

  describe('스크롤 위치에 따라서 스타일이 변경된다', () => {
    context('scroll 위치가 최상단일 때', () => {
      given('isScrollTop', () => true);

      it('box-shadow 속성이 "transparent"이어야 한다', () => {
        renderHeader();

        expect(screen.getByTestId('header-block')).toHaveStyle({
          'box-shadow': '0 1px 0 0 transparent',
        });
      });
    });

    context('scroll 위치가 최상단일 때', () => {
      given('isScrollTop', () => false);

      it(`box-shadow 속성이 ${palette.accent2} 이어야 한다`, () => {
        renderHeader();

        expect(screen.getByTestId('header-block')).toHaveStyle({
          'box-shadow': `0 1px 0 0 ${palette.accent2}`,
        });
      });
    });
  });

  context('세션이 존재한 경우', () => {
    given('user', () => ({
      uid: '1',
      name: 'test',
      email: 'test@test.com',
      image: 'http://image.com',
    }));

    it('"팀 모집하기" 링크가 나타나야만 한다', () => {
      renderHeader();

      expect(screen.getByText('팀 모집하기')).toHaveAttribute('href', '/write');
    });
  });

  context('세션 정보가 존재하지 않는 경우', () => {
    given('user', () => (null));

    it('"시작하기" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('시작하기');
    });

    describe('"시작하기" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderHeader();

        fireEvent.click(screen.getByText('시작하기'));

        expect(handleClick).toBeCalledTimes(1);
      });
    });
  });
});
