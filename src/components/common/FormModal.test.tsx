import { fireEvent, render, screen } from '@testing-library/react';

import FormModal from './FormModal';

describe('FormModal', () => {
  const handleSubmit = jest.fn();
  const handleClose = jest.fn();
  const MockComponent = () => <>Test</>;

  const renderFormModal = () => render((
    <FormModal
      size={given.size}
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

    context('size가 small인 경우', () => {
      given('size', () => 'small');

      it('width값은 400px이어야만 한다', () => {
        renderFormModal();

        expect(screen.getByTestId('form-modal-box')).toHaveStyle({
          width: '400px',
        });
      });
    });

    context('size가 medium인 경우', () => {
      given('size', () => 'medium');

      it('width값은 600px이어야만 한다', () => {
        renderFormModal();

        expect(screen.getByTestId('form-modal-box')).toHaveStyle({
          width: '600px',
        });
      });
    });

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
