import { useMutation, useQueryClient } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { CommentForm } from '@/models/group';
import { postGroupComment } from '@/services/api/comment';
import { checkNumNull } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useAddComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation<string, FirestoreError, CommentForm>((
    commentForm,
  ) => postGroupComment(commentForm), {
    onSuccess: (_, commentForm: CommentForm) => {
      queryClient.invalidateQueries(['comments', {
        id: commentForm.groupId,
      }]);
      queryClient.setQueryData<number>(['commentCount', commentForm.groupId], (commentCount) => checkNumNull(commentCount) + 1);
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
