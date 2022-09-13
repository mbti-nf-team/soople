import { fireEvent, render, screen } from '@testing-library/react';

import InjectResponsiveContext from '@/test/InjectResponsiveContext';

import ConfirmModal from './ConfirmModal';

describe('ConfirmModal', () => {
  const handleConfirm = jest.fn();
  const handleClose = jest.fn();

  const renderConfirmModal = () => render((
    <InjectResponsiveContext width={given.width}>
      <ConfirmModal
        isVisible={given.isVisible}
        title="제목"
        description="내용"
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </InjectResponsiveContext>
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('닫기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderConfirmModal();

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });

    describe('확인 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderConfirmModal();

        fireEvent.click(screen.getByText('확인'));

        expect(handleConfirm).toBeCalledTimes(1);
      });
    });

    context('모바일 화면인 경우', () => {
      given('width', () => 400);

      it('confirm 버튼의 width값은 70%가 되어야만 한다', () => {
        renderConfirmModal();

        expect(screen.getByTestId('confirm-button')).toHaveStyle({
          width: '70%',
        });
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderConfirmModal();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
