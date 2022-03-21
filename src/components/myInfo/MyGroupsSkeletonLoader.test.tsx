import { render, screen } from '@testing-library/react';

import MyGroupsSkeletonLoader from './MyGroupsSkeletonLoader';

describe('MyGroupsSkeletonLoader', () => {
  const renderMyGroupsSkeletonLoader = () => render((
    <MyGroupsSkeletonLoader />
  ));

  it('my groups 로딩 스켈레톤이 나타나야만 한다', () => {
    renderMyGroupsSkeletonLoader();

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  });
});
