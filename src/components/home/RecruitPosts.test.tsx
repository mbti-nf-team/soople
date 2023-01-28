import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import useInfiniteFetchGroups from '@/hooks/api/group/useInfiniteFetchGroups';

import GROUP_FIXTURE from '../../../fixtures/group';

import RecruitPosts from './RecruitPosts';

jest.mock('@/hooks/api/group/useInfiniteFetchGroups');

describe('RecruitPosts', () => {
  const handleClickEmptyButton = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useInfiniteFetchGroups as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: given.groups,
          }],
        },
        isFetchingNextPage: given.isFetchingNextPage,
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: createRef(),
      },
    }));
  });

  const renderRecruitPosts = () => render((
    <RecruitPosts
      onClickEmptyButton={handleClickEmptyButton}
    />
  ));

  context('리스트가 존재하는 경우', () => {
    given('groups', () => [GROUP_FIXTURE]);

    it('그룹 리스트가 보여야만 한다', () => {
      const { container } = renderRecruitPosts();

      expect(container).toHaveTextContent('title');
    });

    context('다음 리스트가 패칭중인 경우', () => {
      given('isFetchingNextPage', () => true);

      it('로딩 스켈레톤이 나타나야만 한다', () => {
        renderRecruitPosts();

        expect(screen.getByTitle('loading...')).toBeInTheDocument();
      });
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

        expect(handleClickEmptyButton).toHaveBeenCalledTimes(1);
      });
    });
  });
});
