import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { Profile } from '@/models/auth';
import { Comment } from '@/models/group';

import CommentView from './CommentView';

interface Props {
  comments: Comment[];
  user: Profile | null;
  onRemove: (commentId: string) => void;
}

function CommentsView({ comments, user, onRemove }: Props): ReactElement {
  const { length } = comments;

  return (
    <CommentsViewWrapper>
      <h4>{`댓글 ${length}`}</h4>
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
  h4 {
    font-weight: 600;
  }

  & > div:last-of-type {
    border-bottom: none;
  }
`;
