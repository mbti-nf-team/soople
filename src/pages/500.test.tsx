import { render } from '@testing-library/react';

import Custom500 from './500.page';

describe('Custom500', () => {
  const renderCustom500 = () => render((
    <Custom500 />
  ));

  it('500 페이지에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderCustom500();

    expect(container).toHaveTextContent('알 수 없는 오류가 발생했어요.');
  });
});
