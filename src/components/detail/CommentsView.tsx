import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import useInfiniteFetchComments from '@/hooks/api/comment/useInfiniteFetchComments';
import { Profile } from '@/models/auth';
import { targetFalseThenValue } from '@/utils/utils';

import CommentSkeletonLoader from './CommentSkeletonLoader';
import CommentView from './CommentView';

interface Props {
  user: Profile | null;
  perPage: number;
  onRemove: (commentId: string) => void;
}

function CommentsView({ user, perPage, onRemove }: Props): ReactElement {
  const { query: { data, isFetchingNextPage }, refState } = useInfiniteFetchComments({
    perPage,
  });

  const comments = data.pages;

  return (
    <CommentsViewWrapper>
      {comments.map(({ items }) => (
        items.map((comment, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <CommentView
              key={comment.commentId}
              user={user}
              onRemove={onRemove}
              comment={comment}
              ref={targetFalseThenValue(!isLastItem)(refState.lastItemRef)}
            />
          );
        })
      ))}
      {isFetchingNextPage && (
        <CommentSkeletonLoader />
      )}
    </CommentsViewWrapper>
  );
}

export default memo(CommentsView);

const CommentsViewWrapper = styled.div`
  & > div:last-of-type {
    border-bottom: none;
    margin-bottom: 50px;
  }
`;
