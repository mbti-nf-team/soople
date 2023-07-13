import { renderHook, waitFor } from '@testing-library/react';

import { getGroupCommentCount } from '@/services/api/comment';
import wrapper from '@/test/ReactQueryWrapper';

import useFetchCommentCount from './useFetchCommentCount';

jest.mock('@/services/api/comment');

describe('useFetchCommentCount', () => {
  const count = 3;

  const useFetchCommentCountHook = () => renderHook(() => useFetchCommentCount('groupId'), {
    wrapper,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (getGroupCommentCount as jest.Mock).mockImplementation(() => (count));
  });

  it('댓글의 개수를 반환해야만 한다', async () => {
    const { result } = useFetchCommentCountHook();

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toBe(count);
  });
});
