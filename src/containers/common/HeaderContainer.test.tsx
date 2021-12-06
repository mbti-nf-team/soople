import { useDispatch } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import SESSION_FIXTURE from '../../../fixtures/session';

import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementationOnce(() => dispatch);
    (useSession as jest.Mock).mockImplementationOnce(() => ([given.session]));
  });

  const renderHeaderContainer = () => render((
    <HeaderContainer />
  ));

  context('로그인한 경우', () => {
    given('session', () => (SESSION_FIXTURE));

    it('"로그아웃" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('로그아웃');
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
