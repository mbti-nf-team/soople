import { render, screen } from '@testing-library/react';

import AlarmsSkeletonLoader from './AlarmsSkeletonLoader';

describe('AlarmsSkeletonLoader', () => {
  const renderAlarmsSkeletonLoader = () => render((
    <AlarmsSkeletonLoader />
  ));

  it('알람 로딩 스켈레톤이 나타나야만 한다', () => {
    renderAlarmsSkeletonLoader();

    expect(screen.getByTitle('loading...')).toBeInTheDocument();
  });
});
