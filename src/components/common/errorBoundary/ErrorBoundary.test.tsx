import { useRouter } from 'next/router';

import { render } from '@testing-library/react';

import ReactQueryWrapper from '../../../test/ReactQueryWrapper';

import ErrorBoundary from './ErrorBoundary';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn);

    (useRouter as jest.Mock).mockImplementation(() => ({
      replace: jest.fn(),
    }));
  });

  const MockErrorComponent = () => {
    throw new Error('test');
  };

  const renderErrorBoundary = () => render((
    <ReactQueryWrapper>
      <ErrorBoundary>
        <MockErrorComponent />
      </ErrorBoundary>
    </ReactQueryWrapper>
  ));

  it('에러 메시지가 보여야만 한다', () => {
    const { container } = renderErrorBoundary();

    expect(container).toHaveTextContent('목록 불러오기에 실패했어요.');
  });
});
