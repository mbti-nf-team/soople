import { render, screen } from '@testing-library/react';

import ApplicationStatusSkeletonLoader from './ApplicationStatusSkeletonLoader';

describe('ApplicationStatusSkeletonLoader', () => {
  const renderApplicationStatusSkeletonLoader = () => render((
    <ApplicationStatusSkeletonLoader isMobile={given.isMobile} />
  ));

  context('isMobile이 true인 경우', () => {
    given('isMobile', () => true);

    it('로딩 스켈레톤이 나타나야만 한다', () => {
      renderApplicationStatusSkeletonLoader();

      expect(screen.getByTitle('loading...')).toBeInTheDocument();
    });
  });

  context('isMobile이 false인 경우', () => {
    given('isMobile', () => false);

    it('로딩 스켈레톤이 나타나야만 한다', () => {
      renderApplicationStatusSkeletonLoader();

      expect(screen.getByTitle('loading...')).toBeInTheDocument();
    });
  });
});
