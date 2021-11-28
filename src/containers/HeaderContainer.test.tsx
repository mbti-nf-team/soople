import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import PROFILE_FIXTURE from '../../fixtures/profile';

import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  beforeEach(() => {
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
  });

  context('로그인하지 않은 경우', () => {
    given('user', () => (null));

    it('"로그인" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('로그인');
    });
  });
});
