import useIsMounted from '@/hooks/useIsMounted';
import renderWithPortal from '@/test/renderWithPortal';

import GlobalPortal from './GlobalPortal';

jest.mock('@/hooks/useIsMounted');

describe('GlobalPortal', () => {
  const childText = 'Test';

  beforeEach(() => {
    jest.clearAllMocks();

    (useIsMounted as jest.Mock).mockImplementation(() => given.isMounted);
  });

  const renderGlobalPortal = () => renderWithPortal((
    <GlobalPortal elementId={given.elementId}>
      <div>{childText}</div>
    </GlobalPortal>
  ));

  context('마운트가 되지 않은 경우', () => {
    given('isMounted', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderGlobalPortal();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context('마운트가 된 경우', () => {
    given('isMounted', () => true);

    context('elementId를 가진 element가 존재하지 않는 경우', () => {
      given('elementId', () => 'test');

      it('아무것도 나타나지 않아야만 한다', () => {
        const { container } = renderGlobalPortal();

        expect(container).toBeEmptyDOMElement();
      });
    });

    context('elementId를 가진 element가 존재하는 경우', () => {
      given('elementId', () => 'portal-container');

      it('자식 컴포넌트가 나타나야만 한다', () => {
        const { container } = renderGlobalPortal();

        expect(container).toHaveTextContent(childText);
      });
    });
  });
});
