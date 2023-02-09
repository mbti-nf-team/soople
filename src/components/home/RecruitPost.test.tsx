import { render, screen } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPost from './RecruitPost';

describe('RecruitPost', () => {
  const renderRecruitPost = () => render((
    <RecruitPost
      group={given.group}
      isPriority={false}
    />
  ));

  context('썸네일이 존재하는 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      thumbnail: 'http://www.test.com',
    }));

    it('썸네일이 나타나야만 한다', () => {
      renderRecruitPost();

      expect(screen.getByAltText('thumbnail')).toBeInTheDocument();
    });
  });

  context('썸네일이 존재하지 않는 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      thumbnail: '',
    }));

    it('썸네일은 존재하지 않아만 한다', () => {
      renderRecruitPost();

      expect(screen.queryByAltText('thumbnail')).not.toBeInTheDocument();
    });
  });

  context('짧은 소개글이 존재하는 경우', () => {
    const shortDescription = '짧은 소개글입니다.';

    given('group', () => ({
      ...GROUP_FIXTURE,
      thumbnail: 'http://www.test.com',
      shortDescription,
    }));

    it('짧은 소개글이 나타나야만 한다', () => {
      const { container } = renderRecruitPost();

      expect(container).toHaveTextContent(shortDescription);
    });
  });

  it('모집글에 대한 정보가 나타나야만 한다', () => {
    given('group', () => (GROUP_FIXTURE));

    const { container } = renderRecruitPost();

    expect(container).toHaveTextContent(GROUP_FIXTURE.title);
  });
});
