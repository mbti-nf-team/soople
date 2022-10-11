import { fireEvent, screen } from '@testing-library/react';

import renderWithPortal from '@/test/renderWithPortal';

import AskRemoveGroupModal from './AskRemoveGroupModal';

describe('AskRemoveGroupModal', () => {
  const handleConfirm = jest.fn();
  const handleClose = jest.fn();

  const renderAskRemoveGroupModal = () => renderWithPortal((
    <AskRemoveGroupModal
      isVisible={given.isVisible}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('닫기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderAskRemoveGroupModal();

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });

    describe('삭제하기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderAskRemoveGroupModal();

        screen.getAllByText('삭제하기').forEach((button) => {
          fireEvent.click(button);
        });

        expect(handleConfirm).toBeCalledTimes(1);
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderAskRemoveGroupModal();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
