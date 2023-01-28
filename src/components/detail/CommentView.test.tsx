import { fireEvent, render, screen } from '@testing-library/react';

import COMMENT_FIXTURE from '../../../fixtures/comment';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import CommentView from './CommentView';

describe('CommentView', () => {
  const handleRemove = jest.fn();

  const renderCommentView = () => render((
    <CommentView
      user={given.user}
      comment={COMMENT_FIXTURE}
      onRemove={handleRemove}
    />
  ));

  context('댓글 작성자인 경우', () => {
    given('user', () => PROFILE_FIXTURE);

    describe('삭제 버튼을 클릭한다', () => {
      it('클릭 이벤트가 발생해야만 한다', () => {
        renderCommentView();

        fireEvent.click(screen.getByText('삭제'));

        expect(handleRemove).toHaveBeenCalledWith(COMMENT_FIXTURE.commentId);
      });
    });
  });

  context('댓글 작성자가 아닌 경우', () => {
    given('user', () => ({
      ...PROFILE_FIXTURE,
      uid: '1',
    }));

    it('삭제 버튼이 나타나지 않아야 한다', () => {
      const { container } = renderCommentView();

      expect(container).not.toHaveTextContent('삭제');
    });
  });
});
