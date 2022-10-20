import { render } from '@testing-library/react';

import useIsMounted from '@/hooks/useIsMounted';

import ClientOnly from './ClientOnly';

jest.mock('@/hooks/useIsMounted');

describe('ClientOnly', () => {
  const child = '자식 컴포넌트';

  beforeEach(() => {
    jest.clearAllMocks();

    (useIsMounted as jest.Mock).mockImplementation(() => (given.isMounted));
  });

  const renderClientOnly = () => render((
    <ClientOnly>
      {child}
    </ClientOnly>
  ));

  context('isMounted가 true인 경우', () => {
    given('isMounted', () => true);

    it('자식 컴포넌트가 나타나야만 한다', () => {
      const { container } = renderClientOnly();

      expect(container).toHaveTextContent(child);
    });
  });

  context('isMounted가 false인 경우', () => {
    given('isMounted', () => false);

    it('아무것도 나타나지 않아야만 한다', () => {
      const { container } = renderClientOnly();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
