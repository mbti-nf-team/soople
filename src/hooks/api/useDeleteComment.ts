import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Comment } from '@/models/group';
import { deleteGroupComment } from '@/services/api/comment';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

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

  const { isError, error } = mutation;

  useCatchErrorWithToast({
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
