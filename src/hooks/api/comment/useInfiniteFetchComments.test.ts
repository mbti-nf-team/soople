import { renderHook } from '@testing-library/react-hooks';

import { getGroupComments } from '@/services/api/comment';
import wrapper from '@/test/InjectMockProviders';

import FIXTURE_COMMENT from '../../../../fixtures/comment';

import useInfiniteFetchComments from './useInfiniteFetchComments';

jest.mock('@/services/api/comment');
jest.mock('@/hooks/useIntersectionObserver');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: 'groupId',
    },
  })),
}));

describe('useInfiniteFetchComments', () => {
  const responseComments = {
    items: [FIXTURE_COMMENT],
    lastUid: '1',
  };

  const useInfiniteFetchCommentsHook = () => renderHook(() => useInfiniteFetchComments({
    perPage: 15,
  }), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (getGroupComments as jest.Mock).mockImplementation(() => (responseComments));
  });

  it('comments에 대한 정보를 반환해야만 한다', async () => {
    const { result, waitFor } = useInfiniteFetchCommentsHook();

    await waitFor(() => result.current.query.isSuccess);

    expect(result.current.query.data?.pages).toEqual([responseComments]);
  });
});
