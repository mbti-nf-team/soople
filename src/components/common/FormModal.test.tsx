import { fireEvent, screen } from '@testing-library/react';

import InjectResponsiveContext from '@/test/InjectResponsiveContext';
import MockTheme from '@/test/MockTheme';
import renderWithPortal from '@/test/renderWithPortal';

import FormModal from './FormModal';

describe('FormModal', () => {
  const handleSubmit = jest.fn();
  const handleClose = jest.fn();
  const MockComponent = () => <>Test</>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderFormModal = () => renderWithPortal((
    <InjectResponsiveContext width={given.width}>
      <MockTheme>
        <FormModal
          size={given.size}
          isVisible={given.isVisible}
          title="제목"
          onClose={handleClose}
          onSubmit={handleSubmit}
        >
          <MockComponent />
        </FormModal>
      </MockTheme>
    </InjectResponsiveContext>
  ));

  context('isVisible이 true인 경우', () => {
    given('isVisible', () => true);

    context('모바일인 경우', () => {
      given('width', () => 400);

      it('confirm 버튼의 width는 100%여야만 한다', () => {
        renderFormModal();

        expect(screen.getByText('확인')).toHaveStyle({
          width: '100%',
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

    context('Enter 키로 submit 했을 경우', () => {
      it('submit 이벤트가 호출되지 않아야만 한다', async () => {
        renderFormModal();

        fireEvent.keyDown(screen.getByText('확인'), { key: 'Enter', code: 'Enter', charCode: 13 });

        expect(handleSubmit).not.toBeCalled();
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
