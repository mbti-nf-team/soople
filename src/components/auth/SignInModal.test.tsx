import { fireEvent, render, screen } from '@testing-library/react';

import SignInModal from './SignInModal';

describe('SignInModal', () => {
  const handleClose = jest.fn();
  const MockComponent = () => <>Mock</>;

  const renderSignInModal = () => render((
    <SignInModal
      isVisible={given.isVisible}
      onClose={handleClose}
    >
      <MockComponent />
    </SignInModal>
  ));

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 보이지 않아야 한다', () => {
      const { container } = renderSignInModal();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('"X" 아이콘을 누른다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderSignInModal();

        fireEvent.click(screen.getByTestId('close-icon'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });
  });
});
