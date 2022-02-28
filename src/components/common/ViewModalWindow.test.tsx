import { fireEvent, render, screen } from '@testing-library/react';

import ViewModalWindow from './ViewModalWindow';

describe('ViewModalWindow', () => {
  const handleClose = jest.fn();
  const MockComponent = () => <>Test</>;

  const renderViewModalWindow = () => render((
    <ViewModalWindow
      size={given.size}
      isVisible={given.isVisible}
      title="제목"
      onClose={handleClose}
    >
      <MockComponent />
    </ViewModalWindow>
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    context('size를 정한 경우', () => {
      given('size', () => ({
        width: '500px',
        height: '500px',
      }));

      it('지정한 width값이어야만 한다', () => {
        renderViewModalWindow();

        expect(screen.getByTestId('modal-box')).toHaveStyle({
          width: '500px',
        });
      });
    });

    context('size를 정하지 않은 경우', () => {
      given('size', () => undefined);

      it('width값은 540px이어야만 한다', () => {
        renderViewModalWindow();

        expect(screen.getByTestId('modal-box')).toHaveStyle({
          width: '540px',
        });
      });
    });

    describe('"x" 아이콘을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderViewModalWindow();

        fireEvent.click(screen.getByTestId('close-icon'));

        expect(handleClose).toBeCalledTimes(1);
      });
    });
  });

  context('isVisible이 false인 경우', () => {
    given('isVisible', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderViewModalWindow();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
