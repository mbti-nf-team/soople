import { fireEvent, render, screen } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPosts from './RecruitPosts';

describe('RecruitPosts', () => {
  const handleClickEmptyButton = jest.fn();

  beforeEach(() => {
    handleClickEmptyButton.mockClear();
  });

  const renderRecruitPosts = () => render((
    <RecruitPosts
      onClickEmptyButton={handleClickEmptyButton}
      groups={given.groups}
    />
  ));

  context('리스트가 존재하는 경우', () => {
    given('groups', () => [GROUP_FIXTURE]);

    it('그룹 리스트가 보여야만 한다', () => {
      const { container } = renderRecruitPosts();

      expect(container).toHaveTextContent('title');
    });
  });

  context('리스트가 존재하지 않는 경우', () => {
    given('groups', () => []);

    it('"모집 중인 팀이 없어요." 문구가 나타나야만 한다', () => {
      const { container } = renderRecruitPosts();

      expect(container).toHaveTextContent('모집 중인 팀이 없어요.');
    });

    describe('"팀 모집하기" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderRecruitPosts();

        fireEvent.click(screen.getByText('팀 모집하기'));

        expect(handleClickEmptyButton).toBeCalledTimes(1);
      });
    });
  });
});
