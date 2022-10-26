import { fireEvent, render, screen } from '@testing-library/react';

import useInfiniteFetchComments from '@/hooks/api/comment/useInfiniteFetchComments';
import { Profile } from '@/models/auth';

import COMMENT_FIXTURE from '../../../fixtures/comment';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import CommentsView from './CommentsView';

jest.mock('@/hooks/api/comment/useInfiniteFetchComments');

describe('CommentsView', () => {
  const handleRemove = jest.fn();
  const lastItemRef = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useInfiniteFetchComments as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{ items: [COMMENT_FIXTURE] }],
        },
        isFetchingNextPage: given.isFetchingNextPage,
      },
      refState: {
        lastItemRef,
      },
    }));
  });

  const renderCommentsView = () => render((
    <CommentsView
      perPage={15}
      user={PROFILE_FIXTURE as Profile}
      onRemove={handleRemove}
    />
  ));

  context('다음 댓글 로딩중인 경우', () => {
    given('isFetchingNextPage', () => true);

    it('스켈레톤 로딩이 나타나야만 한다', () => {
      renderCommentsView();

      expect(screen.getByTestId('comments-skeleton-loading')).toBeInTheDocument();
    });
  });

  describe('댓글 작성자가 삭제하기 버튼을 클릭한다', () => {
    it('클릭 이벤트가 발생해야만 한다', () => {
      renderCommentsView();

      fireEvent.click(screen.getByText('삭제'));

      expect(handleRemove).toBeCalledWith(COMMENT_FIXTURE.commentId);
    });
  });
});
