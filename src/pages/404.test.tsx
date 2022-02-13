import { render } from '@testing-library/react';

import Custom404 from './404.page';

describe('Custom404', () => {
  const renderCustom404 = () => render((
    <Custom404 />
  ));

  it('404 페이지에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderCustom404();

    expect(container).toHaveTextContent('Page Not Found');
  });
});
