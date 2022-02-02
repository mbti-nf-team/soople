import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import usePublishNewGroup from '@/hooks/api/group/usePublishNewGroup';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import NewPage from './write.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
  })),
}));
jest.mock('@/hooks/api/group/usePublishNewGroup');

describe('WritePage', () => {
  beforeEach(() => {
    (usePublishNewGroup as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
    }));
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: '',
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
