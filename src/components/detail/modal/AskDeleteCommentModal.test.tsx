import { fireEvent, render, screen } from '@testing-library/react';

import AskDeleteCommentModal from './AskDeleteCommentModal';

describe('AskDeleteCommentModal', () => {
  const handleConfirm = jest.fn();
  const handleClose = jest.fn();

  const renderAskDeleteCommentModal = () => render((
    <AskDeleteCommentModal
      isVisible={given.isVisible}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('닫기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderAskDeleteCommentModal();

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });

    describe('삭제하기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderAskDeleteCommentModal();

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
      const { container } = renderAskDeleteCommentModal();

      expect(container).toBeEmptyDOMElement();
    });
  });
});