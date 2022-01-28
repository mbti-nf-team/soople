import { fireEvent, render, screen } from '@testing-library/react';

import FIXTURE_GROUP from '../../../fixtures/group';

import RecruitedPost from './RecruitedPost';

describe('RecruitedPost', () => {
  const handleClick = jest.fn();

  const renderRecruitedPost = () => render((
    <RecruitedPost
      onClick={handleClick}
      group={FIXTURE_GROUP}
    />
  ));

  it('group에 대한 내용이 나타나야만 한다', () => {
    const { container } = renderRecruitedPost();

    expect(container).toHaveTextContent(FIXTURE_GROUP.title);
  });

  describe('group을 클릭한다', () => {
    it('클릭 이벤트가 호출되어야만 한다', () => {
      renderRecruitedPost();

      fireEvent.click(screen.getByText(FIXTURE_GROUP.title));

      expect(handleClick).toBeCalledWith(FIXTURE_GROUP.groupId);
    });
  });
});
