import { fireEvent, render, screen } from '@testing-library/react';

import FormModal from './FormModal';

describe('FormModal', () => {
  const handleSubmit = jest.fn();
  const handleClose = jest.fn();
  const MockComponent = () => <>Test</>;

  const renderFormModal = () => render((
    <FormModal
      isVisible={given.isVisible}
      title="제목"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <MockComponent />
    </FormModal>
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    describe('닫기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderFormModal();

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });

    describe('확인 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderFormModal();

        fireEvent.submit(screen.getByText('확인'));

        expect(handleSubmit).toBeCalledTimes(1);
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderFormModal();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
