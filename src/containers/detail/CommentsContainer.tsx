import React, { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import CommentForm from '@/components/detail/CommentForm';
import CommentsView from '@/components/detail/CommentsView';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useGetUser from '@/hooks/api/auth/useGetUser';
import useAddComment from '@/hooks/api/comment/useAddComment';
import useDeleteComment from '@/hooks/api/comment/useDeleteComment';
import useFetchComments from '@/hooks/api/comment/useFetchComments';
import { GroupQuery } from '@/models';
import { CommentFields } from '@/models/group';
import { h4Font } from '@/styles/fontStyles';

function CommentsContainer(): ReactElement {
  const router = useRouter();
  const { id: groupId } = router.query as GroupQuery;
  const { data: user } = useGetUser();
  const { data: profile } = useFetchUserProfile();
  const { data: comments, isLoading } = useFetchComments();
  const { mutate: addCommentMutate } = useAddComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const onSubmit = useCallback((commentForm: CommentFields) => addCommentMutate({
    ...commentForm,
    groupId,
  }), [profile, groupId, addCommentMutate]);

  const onRemoveComment = useCallback((commentId: string) => deleteCommentMutate({
    commentId, groupId,
  }), [deleteCommentMutate, groupId]);

  return (
    <>
      <CommentCount>{`댓글 ${comments.length}`}</CommentCount>
      <CommentForm
        user={profile}
        onSubmit={onSubmit}
      />
      <CommentsView
        user={user}
        comments={comments}
        isLoading={isLoading}
        onRemove={onRemoveComment}
      />
    </>
  );
}

export default CommentsContainer;

const CommentCount = styled.h4`
  ${h4Font(true)}
  margin-top: 24px;
  margin-bottom: 16px;
`;
