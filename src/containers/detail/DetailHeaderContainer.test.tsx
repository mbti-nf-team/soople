import { render } from '@testing-library/react';

import DetailHeaderContainer from './DetailHeaderContainer';

describe('DetailHeaderContainer', () => {
  const renderDetailHeaderContainer = () => render((
    <DetailHeaderContainer />
  ));

  it('DetailHeaderContainer에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderDetailHeaderContainer();

    expect(container).toHaveTextContent('detail 페이지');
  });
});
