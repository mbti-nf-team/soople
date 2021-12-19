import { render } from '@testing-library/react';

import COMMENT_FIXTURE from '../../../fixtures/comment';

import CommentsView from './CommentsView';

describe('CommentsView', () => {
  const renderCommentsView = () => render((
    <CommentsView comments={given.comments} />
  ));

  context('댓글 목록이 존재하지 않는 경우', () => {
    given('comments', () => ([]));

    it('"댓글이 존재하지 않아요!" 문구가 나타나야만 한다', () => {
      const { container } = renderCommentsView();

      expect(container).toHaveTextContent('댓글이 존재하지 않아요!');
    });
  });

  context('댓글 목록이 존재하는 경우', () => {
    given('comments', () => ([COMMENT_FIXTURE]));

    it('"댓글이 존재하지 않아요!" 문구가 나타나야만 한다', () => {
      const { container } = renderCommentsView();

      expect(container).toHaveTextContent(COMMENT_FIXTURE.content);
    });
  });
});
