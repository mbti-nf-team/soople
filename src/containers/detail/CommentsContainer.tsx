import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CommentForm from '@/components/detail/CommentForm';
import CommentsView from '@/components/detail/CommentsView';
import { loadComments, requestAddComment } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth, getGroup } from '@/utils/utils';

function CommentsContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const comments = useSelector(getGroup('comments'));
  const group = useSelector(getGroup('group'));
  const user = useSelector(getAuth('user'));

  const onSubmit = useCallback((content: string) => {
    if (!user) {
      return;
    }

    dispatch(requestAddComment({
      content,
      writer: user,
    }));
  }, [dispatch, user]);

  useEffect(() => {
    if (group) {
      dispatch(loadComments(group.groupId));
    }
  }, []);

  return (
    <>
      <CommentsView
        comments={comments}
      />
      <CommentForm
        onSubmit={onSubmit}
      />
    </>
  );
}

export default CommentsContainer;
