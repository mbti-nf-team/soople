import { render } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import Home from './HomeContainer';

describe('Home', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockImplementationOnce(() => ([null]));
  });

  const renderHome = () => render((
    <Home />
  ));

  it('홈에 대한 정보가 보여져야만 한다', () => {
    const { container } = renderHome();

    expect(container).toHaveTextContent('홈!');
  });
});
