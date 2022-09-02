import { act, renderHook } from '@testing-library/react';

import { postGroupComment } from '@/services/api/comment';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_PROFILE from '../../../../fixtures/profile';

import useAddComment from './useAddComment';

jest.mock('@/services/api/comment');

describe('useAddComment', () => {
  const useAddCommentHook = () => renderHook(() => useAddComment(15), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (postGroupComment as jest.Mock).mockImplementation(() => ('commentId'));
  });

  it('comment의 id를 반환해야만 한다', async () => {
    const { result } = useAddCommentHook();

    await act(async () => {
      await result.current.mutate({
        content: 'content',
        groupId: '1',
        writer: FIXTURE_PROFILE,
      });
    });

    expect(result.current.data).toBe('commentId');
    expect(postGroupComment).toBeCalled();
  });
});
