import { renderHook } from '@testing-library/react-hooks';

import { getGroupComments } from '@/services/api/comment';
import wrapper from '@/test/InjectMockProviders';

import FIXTURE_COMMENT from '../../../../fixtures/comment';

import useFetchComments from './useFetchComments';

jest.mock('@/services/api/comment');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: 'groupId',
    },
  })),
}));

describe('useFetchComments', () => {
  const useFetchCommentsHook = () => renderHook(() => useFetchComments(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (getGroupComments as jest.Mock).mockImplementation(() => (given.comments));
  });

  given('comments', () => [FIXTURE_COMMENT]);

  it('comments에 대한 정보를 반환해야만 한다', async () => {
    const { result, waitFor } = useFetchCommentsHook();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual([FIXTURE_COMMENT]);
  });
});
