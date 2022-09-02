import FIXTURE_COMMENT from '../../../../../fixtures/comment';
import FIXTURE_PROFILE from '../../../../../fixtures/profile';

import { addCommentQueryData, deleteCommentQueryData } from '.';

describe('addCommentQueryData', () => {
  const commentId = 'commentId';
  const commentForm = {
    content: 'content',
    groupId: 'groupId',
    writer: FIXTURE_PROFILE,
  };

  const newComments = addCommentQueryData(commentId, commentForm);

  it('pages.items의 첫번째 인덱스에 새로운 comment item이 추가되어야만 한다', () => {
    const result = newComments({
      pageParams: [],
      pages: [{
        items: [FIXTURE_COMMENT],
      }, {
        items: [FIXTURE_COMMENT],
      }],
    });

    expect(result.pages).toEqual([{
      items: [
        {
          commentId,
          ...commentForm,
          createdAt: new Date().toString(),
        },
        FIXTURE_COMMENT,
      ],
    }, {
      items: [FIXTURE_COMMENT],
    }]);
  });
});

describe('deleteCommentQueryData', () => {
  const { commentId } = FIXTURE_COMMENT;
  const mockComment = {
    ...FIXTURE_COMMENT,
    commentId: '2',
  };

  const newComments = deleteCommentQueryData(commentId);

  it(`${commentId}를 가진 아이템이 삭제된 후 반환되어야만 한다`, () => {
    const result = newComments({
      pageParams: [],
      pages: [{
        items: [FIXTURE_COMMENT, mockComment],
      }, {
        items: [mockComment],
      }],
    });

    expect(result.pages).toEqual([{
      items: [mockComment],
    }, {
      items: [mockComment],
    }]);
  });
});
