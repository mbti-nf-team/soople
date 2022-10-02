import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import { InfiniteResponse } from '@/models';
import { Comment, CommentForm } from '@/models/group';
import { postGroupComment } from '@/services/api/comment';
import { checkNumNull } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

import { addCommentQueryData } from './queryDataUtils';

function useAddComment(perPage: number) {
  const queryClient = useQueryClient();

  const mutation = useMutation<string, FirestoreError, CommentForm>((
    commentForm,
  ) => postGroupComment(commentForm), {
    onSuccess: (commentId: string, commentForm: CommentForm) => {
      queryClient.setQueryData<number>(['commentCount', commentForm.groupId], (commentCount) => checkNumNull(commentCount) + 1);
      queryClient.setQueryData<InfiniteData<InfiniteResponse<Comment>> | undefined>(['comments', {
        id: commentForm.groupId,
        perPage,
      }], addCommentQueryData(commentId, commentForm));
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '댓글 작성에 실패했어요! 짐시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useAddComment;
