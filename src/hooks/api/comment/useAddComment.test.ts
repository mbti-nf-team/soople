import { act, renderHook, waitFor } from '@testing-library/react';

import { postGroupComment } from '@/services/api/comment';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_PROFILE from '../../../../fixtures/profile';

import useAddComment from './useAddComment';

jest.mock('@/services/api/comment');

describe('useAddComment', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (postGroupComment as jest.Mock).mockResolvedValue('commentId');
  });

  const useAddCommentHook = () => renderHook(() => useAddComment(15), { wrapper });

  it('comment의 id를 반환해야만 한다', async () => {
    const { result } = useAddCommentHook();

    await act(async () => {
      await result.current.mutate({
        content: 'content',
        groupId: '1',
        writer: FIXTURE_PROFILE,
      });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(postGroupComment).toHaveBeenCalled();
    expect(result.current.data).toBe('commentId');
  });
});
