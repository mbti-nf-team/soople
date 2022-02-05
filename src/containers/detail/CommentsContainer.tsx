import React, { ReactElement, useCallback } from 'react';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import CommentForm from '@/components/detail/CommentForm';
import CommentsView from '@/components/detail/CommentsView';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useAddComment from '@/hooks/api/comment/useAddComment';
import useDeleteComment from '@/hooks/api/comment/useDeleteComment';
import useFetchComments from '@/hooks/api/comment/useFetchComments';
import { GroupQuery } from '@/models';
import { CommentFields } from '@/models/group';
import { signInModalVisibleState } from '@/recoil/modal/atom';

function CommentsContainer(): ReactElement {
  const router = useRouter();
  const { id: groupId } = router.query as GroupQuery;
  const { data: user } = useGetUser();
  const { data: profile } = useFetchUserProfile();
  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);
  const { data: comments, isLoading } = useFetchComments();
  const { mutate: addCommentMutate } = useAddComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const onVisibleSignInModal = () => setSignInModalVisible(true);

  const onSubmit = useCallback((commentForm: CommentFields) => addCommentMutate({
    ...commentForm,
    groupId,
  }), [profile, groupId, addCommentMutate]);

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
        user={profile}
        onSubmit={onSubmit}
        onVisible={onVisibleSignInModal}
      />
    </>
  );
}

export default CommentsContainer;
