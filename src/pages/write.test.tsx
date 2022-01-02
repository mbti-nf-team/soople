import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import NewPage from './write.page';

describe('WritePage', () => {
  const renderNewPage = () => render((
    <NewPage />
  ));

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: '',
      },
      groupReducer: {
        groupId: '',
        writeFields: {
          title: '',
        },
      },
    }));
  });

  it('"등록하기" 버튼이 나타나야만 한다', () => {
    const { container } = renderNewPage();

    expect(container).toHaveTextContent('등록하기');
  });
});
