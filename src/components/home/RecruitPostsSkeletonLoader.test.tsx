import { render, screen } from '@testing-library/react';

import RecruitPostsSkeletonLoader from './RecruitPostsSkeletonLoader';

describe('RecruitPostsSkeletonLoader', () => {
  const renderRecruitPostsSkeletonLoader = () => render((
    <RecruitPostsSkeletonLoader />
  ));

  it('로딩 스켈레톤이 나타나야만 한다', () => {
    renderRecruitPostsSkeletonLoader();

    expect(screen.getByTitle('loading...')).toBeInTheDocument();
  });
});
