import { createRef } from 'react';

import { useRouter } from 'next/router';

import { act, render } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useInfiniteFetchGroups from '@/hooks/api/group/useInfiniteFetchGroups';
import useFetchTagsCount from '@/hooks/api/tagsCount/useFetchTagsCount';
import InjectMockProviders from '@/test/InjectMockProviders';

import HomePage from './index.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => Math.random()),
}));

jest.mock('@/hooks/api/auth/useGetUser');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/tagsCount/useFetchTagsCount');
jest.mock('@/hooks/api/group/useInfiniteFetchGroups');

describe('HomePage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/',
      query: {
        error: null,
      },
    }));

    (useInfiniteFetchGroups as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [],
          }],
        },
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: createRef(),
      },
    }));

    (useGetUser as jest.Mock).mockImplementation(() => ({
      data: 'test',
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: '',
    }));

    (useFetchTagsCount as jest.Mock).mockImplementation(() => ({
      data: [],
    }));
  });

  const renderHome = () => render((
    <InjectMockProviders>
      <HomePage />
    </InjectMockProviders>
  ));

  it('홈에 대한 정보가 보여져야만 한다', async () => {
    const { container } = renderHome();

    await act(() => expect(container).toHaveTextContent('시작하기'));
  });
});
