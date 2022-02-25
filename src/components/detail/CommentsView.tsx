import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { Profile } from '@/models/auth';
import { Comment } from '@/models/group';

import CommentView from './CommentView';

interface Props {
  comments: Comment[];
  user: Profile | null;
  onRemove: (commentId: string) => void;
  isLoading: boolean;
}

function CommentsView({
  isLoading, comments, user, onRemove,
}: Props): ReactElement {
  if (isLoading) {
    return <CommentsViewWrapper>로딩중...</CommentsViewWrapper>;
  }

  return (
    <CommentsViewWrapper>
      {comments.map((comment) => (
        <CommentView
          key={comment.commentId}
          user={user}
          onRemove={onRemove}
          comment={comment}
        />
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
