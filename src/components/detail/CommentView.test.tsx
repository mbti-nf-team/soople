import { render } from '@testing-library/react';

import COMMENT_FIXTURE from '../../../fixtures/comment';

import CommentView from './CommentView';

describe('CommentView', () => {
  const renderCommentView = () => render((
    <CommentView
      comment={COMMENT_FIXTURE}
    />
  ));

  it('댓글이 보여저야만 한다', () => {
    const { container } = renderCommentView();

    expect(container).toHaveTextContent(COMMENT_FIXTURE.content);
  });
});
