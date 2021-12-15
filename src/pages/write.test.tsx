import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import NewPage from './write.page';

describe('WritePage', () => {
  const renderNewPage = () => render((
    <NewPage />
  ));

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        groupId: '',
        writeFields: {
          title: '',
        },
      },
    }));
    (useSession as jest.Mock).mockImplementation(() => ([given.session, given.loading]));
  });

  it('"등록하기" 버튼이 나타나야만 한다', () => {
    const { container } = renderNewPage();

    expect(container).toHaveTextContent('등록하기');
  });
});
