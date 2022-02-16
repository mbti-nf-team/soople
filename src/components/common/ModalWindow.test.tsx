import { fireEvent, render, screen } from '@testing-library/react';

import ModalWindow from './ModalWindow';

describe('ModalWindow', () => {
  const handleClose = jest.fn();
  const MockComponent = () => <>Test</>;

  const renderModalWindow = () => render((
    <ModalWindow
      size={given.size}
      isVisible={given.isVisible}
      title="제목"
      onClose={handleClose}
    >
      <MockComponent />
    </ModalWindow>
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    context('size를 정한 경우', () => {
      given('size', () => ({
        width: '500px',
        height: '500px',
      }));

      it('지정한 width값이어야만 한다', () => {
        renderModalWindow();

        expect(screen.getByTestId('modal-box')).toHaveStyle({
          width: '500px',
        });
      });
    });

    context('size를 정하지 않은 경우', () => {
      given('size', () => undefined);

      it('width값은 540px이어야만 한다', () => {
        renderModalWindow();

        expect(screen.getByTestId('modal-box')).toHaveStyle({
          width: '540px',
        });
      });
    });

    describe('닫기 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderModalWindow();

        fireEvent.click(screen.getByText('닫기'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderModalWindow();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
