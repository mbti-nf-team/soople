import { ReactElement, Suspense, useCallback } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { checkNumber } from '@nf-team/core';
import { ClientOnly } from '@nf-team/react';

import ErrorBoundary from '@/components/common/errorBoundary/ErrorBoundary';
import CommentForm from '@/components/detail/CommentForm';
import CommentSkeletonLoader from '@/components/detail/CommentSkeletonLoader';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useAddComment from '@/hooks/api/comment/useAddComment';
import useFetchCommentCount from '@/hooks/api/comment/useFetchCommentCount';
import { GroupQuery } from '@/models';
import { CommentFields } from '@/models/group';
import { h4Font } from '@/styles/fontStyles';

const CommentsView = dynamic(() => import('@/components/detail/CommentsView'), { suspense: true });

function CommentsContainer(): ReactElement {
  const perPage = 15;

  const router = useRouter();
  const { id: groupId } = router.query as GroupQuery;
  const { data: user } = useFetchUserProfile();
  const { data: commentCount } = useFetchCommentCount(groupId);
  const { mutate: addCommentMutate } = useAddComment(perPage);

  const onSubmit = useCallback((commentForm: CommentFields) => addCommentMutate({
    ...commentForm,
    groupId,
  }), [groupId]);

  return (
    <>
      <CommentCount>{`댓글 ${checkNumber(commentCount)}`}</CommentCount>
      <CommentForm
        user={user}
        onSubmit={onSubmit}
      />
      <ClientOnly>
        <ErrorBoundary>
          <Suspense fallback={<CommentSkeletonLoader />}>
            <CommentsView
              userUid={user?.uid}
              perPage={perPage}
            />
          </Suspense>
        </ErrorBoundary>
      </ClientOnly>
    </>
  );
}

export default CommentsContainer;

const CommentCount = styled.h4`
  ${h4Font(true)}
  margin-top: 24px;
  margin-bottom: 16px;
`;
