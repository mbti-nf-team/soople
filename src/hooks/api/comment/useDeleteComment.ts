import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import useRenderSuccessToast from '@/hooks/useRenderSuccessToast';
import { InfiniteResponse } from '@/models';
import { Comment } from '@/models/group';
import { deleteGroupComment } from '@/services/api/comment';
import { checkNumNull } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

import { deleteCommentQueryData } from './queryDataUtils';

export type DeleteCommentForm = {
  commentId: string;
  groupId: string;
};

function useDeleteComment(perPage: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, FirestoreError, DeleteCommentForm>((
    commentForm,
  ) => deleteGroupComment(commentForm.commentId), {
    onSuccess: (_: void, { groupId, commentId }: DeleteCommentForm) => {
      queryClient.setQueryData<number>(['commentCount', groupId], (commentCount) => checkNumNull(commentCount) - 1);
      queryClient.setQueryData<InfiniteData<InfiniteResponse<Comment>> | undefined>(['comments', {
        id: groupId,
        perPage,
      }], deleteCommentQueryData(commentId));
    },
  });

  const { isError, error, isSuccess } = mutation;

  useRenderSuccessToast(isSuccess, {
    message: '댓글을 삭제했어요.',
  });

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '댓글 삭제에 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useDeleteComment;
