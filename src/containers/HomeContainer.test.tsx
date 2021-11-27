import { render } from '@testing-library/react';

import Home from './HomeContainer';

describe('Home', () => {
  const renderHome = () => render((
    <Home />
  ));

  it('홈에 대한 정보가 보여져야만 한다', () => {
    const { container } = renderHome();

    expect(container).toHaveTextContent('홈!');
  });
});
