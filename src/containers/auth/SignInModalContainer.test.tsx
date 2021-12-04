import { fireEvent, render, screen } from '@testing-library/react';

import SignInModalContainer from './SignInModalContainer';

describe('SignInModalContainer', () => {
  const handleClose = jest.fn();

  const renderSignInModalContainer = () => render((
    <SignInModalContainer
      onClose={handleClose}
      isVisible={given.isVisible}
    />
  ));

  context('SignIn 모달이 열린 경우', () => {
    given('isVisible', () => true);
    const socialButtons = ['구글', '깃허브', '카카오'];

    it('소셜 로그인 버튼들이 나타야만 한다', () => {
      const { container } = renderSignInModalContainer();

      socialButtons.forEach((button) => {
        expect(container).toHaveTextContent(`${button} 로그인`);
      });
    });

    describe('"X" 버튼을 누른다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSignInModalContainer();

        fireEvent.click(screen.getByText('X'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });
  });

  context('SignIn 모달이 열린 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야 한다', () => {
      const { container } = renderSignInModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
