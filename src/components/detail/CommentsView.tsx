import React, { ReactElement } from 'react';

import { Comment } from '@/models/group';

import CommentView from './CommentView';

interface Props {
  comments: Comment[];
}

function CommentsView({ comments }: Props): ReactElement {
  const { length } = comments;

  if (!length) {
    return (
      <>
        <div>{`댓글 ${length}`}</div>
        <div>댓글이 존재하지 않아요!</div>
      </>
    );
  }

  return (
    <div>
      <div>{`댓글 ${length}`}</div>
      <ul>
        {comments.map((comment) => (
          <CommentView
            key={comment.commentId}
            comment={comment}
          />
        ))}
      </ul>
    </div>
  );
}

export default CommentsView;
