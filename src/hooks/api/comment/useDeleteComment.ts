import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import useRenderSuccessToast from '@/hooks/useRenderSuccessToast';
import { Comment } from '@/models/group';
import { deleteGroupComment } from '@/services/api/comment';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

type DeleteCommentForm = {
  commentId: string;
  groupId: string;
}

function useDeleteComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, FirestoreError, DeleteCommentForm>((
    commentForm,
  ) => deleteGroupComment(commentForm.commentId), {
    onSuccess: (_: void, { groupId, commentId }: DeleteCommentForm) => {
      queryClient.setQueryData<Comment[]>(['comments', groupId], filteredRemoveComment(commentId));
    },
  });

  const { isError, error, isSuccess } = mutation;

  useRenderSuccessToast(isSuccess, '댓글을 삭제했어요.');

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '댓글 삭제에 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useDeleteComment;

export const filteredRemoveComment = (removeId: string) => (
  comments: Comment[] = [],
) => comments.filter(({ commentId }) => commentId !== removeId);
