import { render } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import NewPage from './new.page';

describe('New page', () => {
  const renderNewPage = () => render((
    <NewPage />
  ));

  beforeEach(() => {
    (useSession as jest.Mock).mockImplementation(() => ([given.session, given.loading]));
  });

  it('New page에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderNewPage();

    expect(container).toHaveTextContent('등록하기');
  });
});
