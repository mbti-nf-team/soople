import { useDispatch } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import palette from '@/styles/palette';

import SESSION_FIXTURE from '../../../fixtures/session';

import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSession as jest.Mock).mockImplementation(() => ([given.session]));
  });

  const renderHeaderContainer = () => render((
    <HeaderContainer />
  ));

  describe('스크롤 위치에 따라 스타일이 변경된다', () => {
    given('session', () => (null));

    context('스크롤 위치가 최상단일 경우', () => {
      it('box-shadow가 "transparent"가 되어야 한다', () => {
        renderHeaderContainer();

        expect(screen.getByTestId('header-block')).toHaveStyle({
          'box-shadow': 'inset 0 -1px 0 0 transparent',
        });
      });
    });

    context('스크롤 위치가 최상단이 아닐 경우', () => {
      it(`box-shadow 속성이 ${palette.accent4} 이어야 한다`, () => {
        renderHeaderContainer();

        fireEvent.scroll(window, { target: { scrollY: 200 } });

        expect(screen.getByTestId('header-block')).toHaveStyle({
          'box-shadow': `inset 0 -1px 0 0 ${palette.accent4}`,
        });
      });
    });
  });

  context('로그인한 경우', () => {
    given('session', () => (SESSION_FIXTURE));

    it('"팀 모집하기" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('팀 모집하기');
    });
  });

  context('로그인하지 않은 경우', () => {
    given('session', () => (null));

    describe('"시작하기" 버튼을 클릭한다', () => {
      it('dispatch 액션이 호출되어야만 한다', () => {
        renderHeaderContainer();

        fireEvent.click(screen.getByText('시작하기'));

        expect(dispatch).toBeCalledWith({
          payload: true,
          type: 'auth/setSignInModalVisible',
        });
      });
    });
  });
});
