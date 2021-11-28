import { render } from '@testing-library/react';

import PROFILE_FIXTURE from '../../fixtures/profile';

import Header from './Header';

describe('Header', () => {
  const renderHeader = () => render((
    <Header
      user={given.user}
    />
  ));

  context('user 정보가 존재한 경우', () => {
    given('user', () => (PROFILE_FIXTURE));

    it('"로그아웃" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('로그아웃');
    });
  });

  context('user 정보가 존재하지 않는 경우', () => {
    given('user', () => (null));

    it('"로그인" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('로그인');
    });
  });
});
