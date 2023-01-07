import { render } from '@testing-library/react';

import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import Test from './test.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    pathname: '',
  })),
}));

// NOTE - 추후 삭제 페이지
describe('Test', () => {
  const renderTest = () => render(
    <ReactQueryWrapper>
      <Test />
    </ReactQueryWrapper>,
  );

  it('"쉽고 빠르게 모집해보세요" 문구가 보여야만 한다', () => {
    const { container } = renderTest();

    expect(container).toHaveTextContent('쉽고 빠르게 모집해보세요');
  });
});
