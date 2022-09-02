import { act, renderHook } from '@testing-library/react';

import { deleteGroupComment } from '@/services/api/comment';
import wrapper from '@/test/ReactQueryWrapper';

import useDeleteComment from './useDeleteComment';

jest.mock('@/services/api/comment');
jest.mock('@/hooks/useRenderSuccessToast');

describe('useDeleteComment', () => {
  const useDeleteCommentHook = () => renderHook(() => useDeleteComment(15), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (deleteGroupComment as jest.Mock).mockImplementation(() => (null));
  });

  it('isSuccess는 true를 반환해야만 한다', async () => {
    const { result } = useDeleteCommentHook();

    await act(async () => {
      await result.current.mutate({
        commentId: 'commentId',
        groupId: 'groupId',
      });
    });

    expect(result.current.isSuccess).toBeTruthy();
    expect(deleteGroupComment).toBeCalled();
  });
});
