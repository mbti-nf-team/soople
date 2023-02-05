import { ReactElement, useCallback } from 'react';

import styled from '@emotion/styled';

import useDeleteComment, { DeleteCommentForm } from '@/hooks/api/comment/useDeleteComment';
import useInfiniteFetchComments from '@/hooks/api/comment/useInfiniteFetchComments';
import { targetFalseThenValue } from '@/utils/utils';

import CommentSkeletonLoader from './CommentSkeletonLoader';
import CommentView from './CommentView';

interface Props {
  userUid: string | undefined;
  perPage: number;
}

function CommentsView({ userUid, perPage }: Props): ReactElement {
  const { query: { data, isFetchingNextPage }, refState } = useInfiniteFetchComments({
    perPage,
  });
  const { mutate: deleteCommentMutate } = useDeleteComment(perPage);

  const comments = data.pages;

  const onRemoveComment = useCallback((
    commentForm: DeleteCommentForm,
  ) => deleteCommentMutate(commentForm), []);

  return (
    <CommentsViewWrapper>
      {comments.map(({ items }) => (
        items.map((comment, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <CommentView
              key={comment.commentId}
              userUid={userUid}
              onRemove={onRemoveComment}
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

export default CommentsView;

const CommentsViewWrapper = styled.div`
  & > div:last-of-type {
    border-bottom: none;
    margin-bottom: 50px;
  }
`;
