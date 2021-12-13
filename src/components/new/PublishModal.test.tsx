import { fireEvent, render, screen } from '@testing-library/react';

import PublishModal from './PublishModal';

describe('PublishModal', () => {
  const MockComponent = () => <div>Mock</div>;
  const handleClose = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderPublishModal = (title = 'title') => render((
    <PublishModal
      title={title}
      isVisible={given.isVisible}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <MockComponent />
    </PublishModal>
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    it('모달 타이틀이 나타나야만 한다', () => {
      const title = '제목입니다';

      const { container } = renderPublishModal(title);

      expect(container).toHaveTextContent(`${title} 등록`);
    });

    describe('닫기 버튼을 누른다', () => {
      it('클릭 이벤트가 발생해야만 한다', () => {
        renderPublishModal();

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toBeCalled();
      });
    });

    describe('"등록하기" 버튼을 누른다', () => {
      it('클릭 이벤트가 발생해야만 한다', () => {
        renderPublishModal();

        fireEvent.click(screen.getByText('등록하기'));

        expect(handleSubmit).toBeCalled();
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 렌더링되지 않아야 한다', () => {
      const { container } = renderPublishModal();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
