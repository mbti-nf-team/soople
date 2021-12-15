import { render } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPosts from './RecruitPosts';

describe('RecruitPosts', () => {
  const renderRecruitPosts = () => render((
    <RecruitPosts
      groups={[GROUP_FIXTURE]}
    />
  ));

  it('그룹 리스트가 보여야만 한다', () => {
    const { container } = renderRecruitPosts();

    expect(container).toHaveTextContent('title');
  });
});
