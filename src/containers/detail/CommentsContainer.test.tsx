import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';

import COMMENT_FIXTURE from '../../../fixtures/comment';
import GROUP_FIXTURE from '../../../fixtures/group';

import CommentsContainer from './CommentsContainer';

describe('CommentsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        group: given.group,
        comments: [COMMENT_FIXTURE],
      },
    }));
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
    (useSession as jest.Mock).mockImplementation(() => ([given.session]));
  });

  const renderCommentsContainer = () => render((
    <CommentsContainer />
  ));

  context('group이 존재하는 경우', () => {
    given('group', () => (GROUP_FIXTURE));

    it('dispatch 액션이 호출되어야만 한다', () => {
      renderCommentsContainer();

      expect(dispatch).toBeCalledTimes(1);
    });
  });

  describe('"댓글 남기기" 버튼을 클릭한다', () => {
    const commentValue = '댓글 내용';

    context('사용자가 로그인 상태인 경우', () => {
      given('session', () => ({
        user: 'test',
      }));

      it('dispatch 액션이 호출되야만 한다', () => {
        renderCommentsContainer();

        fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요'), {
          target: {
            value: commentValue,
          },
        });

        fireEvent.click(screen.getByText('댓글 남기기'));

        expect(dispatch).toBeCalledTimes(1);
      });
    });

    context('사용자가 비로그인 상태인 경우', () => {
      given('session', () => ({
        user: '',
      }));

      it('dispatch 액션이 호출되지 않아야 한다', () => {
        renderCommentsContainer();

        fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요'), {
          target: {
            value: commentValue,
          },
        });

        fireEvent.click(screen.getByText('댓글 남기기'));

        expect(dispatch).not.toBeCalled();
      });
    });
  });
});
