import { render, screen } from '@testing-library/react';

import TagsBarSkeletonLoader from './TagsBarSkeletonLoader';

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => Math.random()),
}));

describe('TagsBarSkeletonLoader', () => {
  const renderTagsBarSkeletonLoader = () => render((
    <TagsBarSkeletonLoader />
  ));

  it('Tag bar에 대한 로딩 스켈레톤이 나타나야만 한다', () => {
    renderTagsBarSkeletonLoader();

    expect(screen.getByTitle('loading...')).toBeInTheDocument();
  });
});
