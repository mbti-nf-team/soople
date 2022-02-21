import { render } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPost from './RecruitPost';

describe('RecruitPost', () => {
  const renderRecruitPost = () => render((
    <RecruitPost
      group={GROUP_FIXTURE}
    />
  ));

  it('모집글에 대한 정보가 나타나야만 한다', () => {
    const { container } = renderRecruitPost();

    expect(container).toHaveTextContent(GROUP_FIXTURE.title);
  });
});
