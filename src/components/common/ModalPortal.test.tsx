import renderWithPortal from '@/test/renderWithPortal';

import ModalPortal from './ModalPortal';

describe('ModalPortal', () => {
  const childText = 'Test';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderModalPortal = () => renderWithPortal((
    <ModalPortal elementId={given.elementId}>
      <div>{childText}</div>
    </ModalPortal>
  ));

  context('elementId를 가진 element가 존재하지 않는 경우', () => {
    given('elementId', () => 'test');

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderModalPortal();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('elementId를 가진 element가 존재하는 경우', () => {
    given('elementId', () => 'portal-container');

    it('자식 컴포넌트가 나타나야만 한다', () => {
      const { container } = renderModalPortal();

      expect(container).toHaveTextContent(childText);
    });
  });
});
