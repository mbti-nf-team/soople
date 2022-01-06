import { fireEvent, render, screen } from '@testing-library/react';

import COMMENT_FIXTURE from '../../../fixtures/comment';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import CommentsView from './CommentsView';

describe('CommentsView', () => {
  const handleRemove = jest.fn();

  const renderCommentsView = () => render((
    <CommentsView
      user={PROFILE_FIXTURE}
      onRemove={handleRemove}
      comments={[COMMENT_FIXTURE]}
    />
  ));

  describe('댓글 작성자가 삭제버튼을 클릭한다', () => {
    it('클릭 이벤트가 발생해야만 한다', () => {
      renderCommentsView();

      fireEvent.click(screen.getByText('삭제'));

      expect(handleRemove).toBeCalledWith(COMMENT_FIXTURE.commentId);
    });
  });
});
