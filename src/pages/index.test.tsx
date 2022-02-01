import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchGroups from '@/hooks/api/group/useFetchGroups';
import useFetchTagsCount from '@/hooks/api/tagsCount/useFetchTagsCount';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';

import GROUP_FIXTURE from '../../fixtures/group';

import HomePage from './index.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/group/useFetchGroups');
jest.mock('@/hooks/api/tagsCount/useFetchTagsCount');

describe('HomePage', () => {
  beforeEach(() => {
    (useFetchGroups as jest.Mock).mockImplementation(() => ({
      data: [GROUP_FIXTURE],
    }));
    (useFetchTagsCount as jest.Mock).mockImplementation(() => ({
      data: [{ name: 'javascript' }],
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/',
      query: {
        error: null,
      },
    }));
  });

  const renderHome = () => render((
    <InjectTestingRecoilState>
      <HomePage />
    </InjectTestingRecoilState>
  ));

  it('홈에 대한 정보가 보여져야만 한다', () => {
    const { container } = renderHome();

    expect(container).toHaveTextContent('시작하기');
  });
});
