import { InfiniteData } from '@tanstack/react-query';

import { InfiniteResponse } from '@/models';
import { Comment, CommentForm } from '@/models/group';
import { checkEmpty } from '@/utils/utils';

export const addCommentQueryData = (commentId: string, commentForm: CommentForm) => (
  comments?: InfiniteData<InfiniteResponse<Comment>>,
) => {
  const newPages = comments?.pages.reduce((prev: InfiniteResponse<Comment>[], cur, index) => {
    if (index === 0) {
      return [
        ...prev,
        {
          ...cur,
          items: [{
            ...commentForm,
            commentId,
            createdAt: new Date().toString(),
          },
          ...cur.items,
          ],
        },
      ];
    }

    return [
      ...prev,
      cur,
    ];
  }, []);

  return {
    pageParams: checkEmpty(comments?.pageParams),
    pages: checkEmpty(newPages),
  };
};

export const deleteCommentQueryData = (commentId: string) => (
  comments?: InfiniteData<InfiniteResponse<Comment>>,
) => {
  const newPages = comments?.pages.map((page) => ({
    ...page,
    items: page.items.filter((item) => item.commentId !== commentId),
  }));

  return {
    pageParams: checkEmpty(comments?.pageParams),
    pages: checkEmpty(newPages),
  };
};
