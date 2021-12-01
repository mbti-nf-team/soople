import { render } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import SESSION_FIXTURE from '../../fixtures/session';

import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

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

    it('"로그인" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeaderContainer();

      expect(container).toHaveTextContent('구글 로그인');
      expect(container).toHaveTextContent('깃허브 로그인');
    });
  });
});
