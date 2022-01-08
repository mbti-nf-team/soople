import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CommentForm from '@/components/detail/CommentForm';
import CommentsView from '@/components/detail/CommentsView';
import { Profile } from '@/models/auth';
import { setSignInModalVisible } from '@/reducers/authSlice';
import { loadComments, requestAddComment, requestDeleteComment } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth, getGroup } from '@/utils/utils';

function CommentsContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const comments = useSelector(getGroup('comments'));
  const group = useSelector(getGroup('group'));
  const user = useSelector(getAuth('user'));

  const onVisibleSignInModal = useCallback(() => dispatch(setSignInModalVisible(true)), [dispatch]);

  const onSubmit = useCallback((commentForm: {
    content: string; writer: Profile;
  }) => dispatch(requestAddComment(commentForm)), [dispatch]);

  const onRemoveComment = useCallback((commentId: string) => {
    dispatch(requestDeleteComment(commentId));
  }, [dispatch]);

  useEffect(() => {
    if (group) {
      dispatch(loadComments(group.groupId));
    }
  }, []);

  return (
    <>
      <CommentsView
        user={user}
        comments={comments}
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
