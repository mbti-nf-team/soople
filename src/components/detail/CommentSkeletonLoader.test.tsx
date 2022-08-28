import { render, screen } from '@testing-library/react';

import CommentSkeletonLoader from './CommentSkeletonLoader';

describe('CommentSkeletonLoader', () => {
  const renderCommentSkeletonLoader = () => render((
    <CommentSkeletonLoader />
  ));

  it('로딩 스켈레톤이 나타나야만 한다', () => {
    renderCommentSkeletonLoader();

    expect(screen.getByTitle('loading...')).toBeInTheDocument();
  });
});
