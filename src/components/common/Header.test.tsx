import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, signOut } from 'next-auth/client';

import Header from './Header';

describe('Header', () => {
  const renderHeader = () => render((
    <Header
      session={given.session}
    />
  ));

  context('세션이 존재한 경우', () => {
    given('session', () => ({
      user: {
        uid: '1',
        name: 'test',
        email: 'test@test.com',
        image: 'http://image.com',
      },
    }));

    it('"로그아웃" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('로그아웃');
    });

    describe('"로그아웃" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderHeader();

        fireEvent.click(screen.getByText('로그아웃'));

        expect(signOut).toBeCalledTimes(1);
      });
    });
  });

  context('세션 정보가 존재하지 않는 경우', () => {
    given('session', () => (null));

    context('OAuth가 구글인 경우', () => {
      describe('"구글 로그인" 버튼을 클릭한다', () => {
        it('클릭 이벤트가 호출되어야만 한다', () => {
          renderHeader();

          fireEvent.click(screen.getByText('구글 로그인'));

          expect(signIn).toBeCalledWith('google');
        });
      });
    });

    context('OAuth가 깃허브인 경우', () => {
      describe('"깃허브 로그인" 버튼을 클릭한다', () => {
        it('클릭 이벤트가 호출되어야만 한다', () => {
          renderHeader();

          fireEvent.click(screen.getByText('깃허브 로그인'));

          expect(signIn).toBeCalledWith('github');
        });
      });
    });

    context('OAuth가 카카오인 경우', () => {
      describe('"카카오 로그인" 버튼을 클릭한다', () => {
        it('클릭 이벤트가 호출되어야만 한다', () => {
          renderHeader();

          fireEvent.click(screen.getByText('카카오 로그인'));

          expect(signIn).toBeCalledWith('kakao');
        });
      });
    });
  });
});
