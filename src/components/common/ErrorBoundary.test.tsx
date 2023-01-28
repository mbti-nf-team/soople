import { useRouter } from 'next/router';

import { render } from '@testing-library/react';

import ReactQueryWrapper from '../../test/ReactQueryWrapper';

import ErrorBoundary from './ErrorBoundary';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ErrorBoundary', () => {
  const errorMessage = '에러가 발생했어요.';
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(console, 'error').mockImplementation(jest.fn);
    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: mockReplace,
    }));
  });

  const MockErrorComponent = () => {
    throw new Error('test');
  };

  const renderErrorBoundary = () => render(
    <ReactQueryWrapper>
      <ErrorBoundary isRootError={given.isRootError} errorMessage={errorMessage}>
        <MockErrorComponent />
      </ErrorBoundary>
    </ReactQueryWrapper>,
  );

  context('isRootError가 true인 경우', () => {
    given('isRootError', () => true);

    it('에러 메시지가 보여야만 한다', () => {
      const { container } = renderErrorBoundary();

      expect(container).toHaveTextContent(errorMessage);
    });

    it('router.replace가 "/500"과 함께 호출되어야만 한다', () => {
      renderErrorBoundary();

      expect(mockReplace).toHaveBeenCalledWith('/500');
    });
  });

  context('isRootError가 false인 경우', () => {
    given('isRootError', () => false);

    it('에러 메시지가 보여야만 한다', () => {
      const { container } = renderErrorBoundary();

      expect(container).toHaveTextContent(errorMessage);
    });

    it('router.replace는 호출되지 않아만한다', () => {
      renderErrorBoundary();

      expect(mockReplace).not.toHaveBeenCalled();
    });
  });
});
