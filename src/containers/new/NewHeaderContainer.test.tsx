import { render } from '@testing-library/react';

import NewHeaderContainer from './NewHeaderContainer';

describe('NewHeaderContainer', () => {
  const renderNewHeaderContainer = () => render((
    <NewHeaderContainer />
  ));

  it('헤더 정보가 나타나야만 한다', () => {
    const { container } = renderNewHeaderContainer();

    expect(container).toHaveTextContent('등록하기');
  });
});
