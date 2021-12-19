import React, { ReactElement, useCallback } from 'react';

import { useSession } from 'next-auth/client';

import CommentForm from '@/components/detail/CommentForm';
import { requestAddComment } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';

function CommentsContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const [session] = useSession();

  const onSubmit = useCallback((content: string) => {
    if (!session?.user) {
      return;
    }

    dispatch(requestAddComment({
      content,
      writer: session.user,
    }));
  }, [dispatch, session]);

  return (
    <CommentForm
      onSubmit={onSubmit}
    />
  );
}

export default CommentsContainer;
