import { fireEvent, screen } from '@testing-library/react';

import renderWithPortal from '@/test/renderWithPortal';

import AskApplyCancelModal from './AskApplyCancelModal';

describe('AskApplyCancelModal', () => {
  const handleCancel = jest.fn();
  const handleClose = jest.fn();

  const renderAskApplyCancelModal = () => renderWithPortal((
    <AskApplyCancelModal
      isVisible={given.isVisible}
      onClose={handleClose}
      onCancel={handleCancel}
    />
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('닫기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderAskApplyCancelModal();

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('취소하기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderAskApplyCancelModal();

        screen.getAllByText('취소하기').forEach((button) => {
          fireEvent.click(button);
        });

        expect(handleCancel).toHaveBeenCalledTimes(1);
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderAskApplyCancelModal();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
