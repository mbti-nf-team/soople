import { fireEvent, render, screen } from '@testing-library/react';

import PROFILE_FIXTURE from '../../fixtures/profile';

import Header from './Header';

describe('Header', () => {
  const handleSignOut = jest.fn();

  beforeEach(() => {
    handleSignOut.mockClear();
  });

  const renderHeader = () => render((
    <Header
      user={given.user}
      onSignOut={handleSignOut}
    />
  ));

  context('user 정보가 존재한 경우', () => {
    given('user', () => (PROFILE_FIXTURE));

    it('"로그아웃" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('로그아웃');
    });

    describe('"로그아웃" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderHeader();

        fireEvent.click(screen.getByText('로그아웃'));

        expect(handleSignOut).toBeCalledTimes(1);
      });
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
