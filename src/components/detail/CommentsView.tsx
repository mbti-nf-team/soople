import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { InfiniteRefState, InfiniteResponse } from '@/models';
import { Profile } from '@/models/auth';
import { Comment } from '@/models/group';
import { targetFalseThenValue } from '@/utils/utils';

import CommentView from './CommentView';

interface Props {
  comments: InfiniteResponse<Comment>[];
  refState: InfiniteRefState<HTMLDivElement>;
  user: Profile | null;
  onRemove: (commentId: string) => void;
  isLoading: boolean;
}

function CommentsView({
  isLoading, comments, user, onRemove, refState,
}: Props): ReactElement {
  if (isLoading) {
    return <CommentsViewWrapper>로딩중...</CommentsViewWrapper>;
  }

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
