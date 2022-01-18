import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  const renderHeader = () => render((
    <Header />
  ));

  it('헤더에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderHeader();

    expect(container).toHaveTextContent('모집 완료');
  });
});
