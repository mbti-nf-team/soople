import { act, renderHook } from '@testing-library/react-hooks';

import { deleteGroupComment } from '@/services/api/comment';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_COMMENT from '../../../../fixtures/comment';

import useDeleteComment, { filteredRemoveComment } from './useDeleteComment';

jest.mock('@/services/api/comment');

describe('useDeleteComment', () => {
  const useDeleteCommentHook = () => renderHook(() => useDeleteComment(), { wrapper });

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
  });
});

describe('filteredRemoveComment', () => {
  const comments = [FIXTURE_COMMENT];

  it('commentId와 다른 comment만 반환해야만 한다', () => {
    const result = filteredRemoveComment('2')(comments);

    expect(result).toEqual(comments);
  });
});
