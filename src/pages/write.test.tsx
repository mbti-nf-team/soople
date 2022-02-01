import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import NewPage from './write.page';

describe('WritePage', () => {
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

  const renderNewPage = () => render((
    <InjectTestingRecoilState>
      <NewPage />
    </InjectTestingRecoilState>
  ));

  it('"등록하기" 버튼이 나타나야만 한다', () => {
    const { container } = renderNewPage();

    expect(container).toHaveTextContent('등록하기');
  });
});
