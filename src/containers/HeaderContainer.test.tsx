import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

import PROFILE_FIXTURE from '../../fixtures/profile';

import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useDispatch as jest.Mock).mockImplementationOnce(() => dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
    }));
  });

  const renderHeaderContainer = () => render((
    <HeaderContainer />
  ));

  context('로그인한 경우', () => {
    given('user', () => (PROFILE_FIXTURE));

    it('"로그아웃" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('로그아웃');
    });

    describe('로그아웃 버튼을 클릭한다', () => {
      it('dispatch 액션이 호출되어야만 한다', () => {
        renderHeaderContainer();

        fireEvent.click(screen.getByText('로그아웃'));

        expect(dispatch).toBeCalled();
      });
    });
  });

  context('로그인하지 않은 경우', () => {
    given('user', () => (null));

    it('"로그인" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('로그인');
    });
  });
});
