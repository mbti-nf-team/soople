import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import CommentForm from '@/components/detail/CommentForm';
import CommentsView from '@/components/detail/CommentsView';
import useAddComment from '@/hooks/api/comment/useAddComment';
import useDeleteComment from '@/hooks/api/comment/useDeleteComment';
import useFetchComments from '@/hooks/api/comment/useFetchComments';
import { GroupQuery } from '@/models';
import { CommentFields } from '@/models/group';
import { signInModalVisibleState } from '@/recoil/modal/atom';
import { getAuth } from '@/utils/utils';

function CommentsContainer(): ReactElement {
  const router = useRouter();
  const { id: groupId } = router.query as GroupQuery;
  const user = useSelector(getAuth('user'));
  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);
  const { data: comments, isLoading } = useFetchComments();
  const { mutate: addCommentMutate } = useAddComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const onVisibleSignInModal = () => setSignInModalVisible(true);

  const onSubmit = useCallback((commentForm: CommentFields) => addCommentMutate({
    ...commentForm,
    groupId,
  }), [groupId, addCommentMutate]);

  const onRemoveComment = useCallback((commentId: string) => deleteCommentMutate({
    commentId, groupId,
  }), [deleteCommentMutate, groupId]);

  return (
    <>
      <CommentsView
        user={user}
        comments={comments}
        isLoading={isLoading}
        onRemove={onRemoveComment}
      />
      <CommentForm
        user={user}
        onSubmit={onSubmit}
        onVisible={onVisibleSignInModal}
      />
    </>
  );
}

export default CommentsContainer;
