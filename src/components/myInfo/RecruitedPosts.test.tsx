import { render } from '@testing-library/react';

import FIXTURE_GROUP from '../../../fixtures/group';

import RecruitedPosts from './RecruitedPosts';

describe('RecruitedPosts', () => {
  const handleClick = jest.fn();

  const renderRecruitedPosts = () => render((
    <RecruitedPosts
      onClickGroup={handleClick}
      groups={given.groups}
    />
  ));

  context('모집한 group이 존재하지 않는 경우', () => {
    given('groups', () => []);

    it('"모집한 팀이 없어요."문구가 보여야만 한다', () => {
      const { container } = renderRecruitedPosts();

      expect(container).toHaveTextContent('모집한 팀이 없어요.');
    });
  });

  context('모집한 group이 존재하는 경우', () => {
    given('groups', () => [FIXTURE_GROUP]);

    it('모집한 팀에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderRecruitedPosts();

      expect(container).toHaveTextContent(FIXTURE_GROUP.title);
    });
  });
});
