import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render, screen } from '@testing-library/react';

import useAddComment from '@/hooks/api/comment/useAddComment';
import useDeleteComment from '@/hooks/api/comment/useDeleteComment';
import useFetchComments from '@/hooks/api/comment/useFetchComments';

import COMMENT_FIXTURE from '../../../fixtures/comment';

import CommentsContainer from './CommentsContainer';

jest.mock('@/hooks/api/comment/useFetchComments');
jest.mock('@/hooks/api/comment/useDeleteComment');
jest.mock('@/hooks/api/comment/useAddComment');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: '1',
    },
  })),
}));

describe('CommentsContainer', () => {
  const dispatch = jest.fn();
  const mutate = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      authReducer: {
        user: given.user,
      },
      groupReducer: {
        comments: [COMMENT_FIXTURE],
      },
    }));
    (useAddComment as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useDeleteComment as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useFetchComments as jest.Mock).mockImplementation(() => ({
      data: [COMMENT_FIXTURE],
      isLoading: false,
    }));
    (useDispatch as jest.Mock).mockImplementation(() => dispatch);
  });

  const renderCommentsContainer = () => render((
    <CommentsContainer />
  ));

  describe('"댓글 남기기" 버튼을 클릭한다', () => {
    const commentValue = '댓글 내용';
    const writer = {
      name: 'test',
      uid: '12345678',
    };

    context('사용자가 로그인 상태인 경우', () => {
      given('user', () => (writer));

      it('mutate 액션이 호출되야만 한다', () => {
        renderCommentsContainer();

        fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요'), {
          target: {
            value: commentValue,
          },
        });

        fireEvent.click(screen.getByText('댓글 남기기'));

        expect(mutate).toBeCalledWith({
          content: commentValue,
          writer,
          groupId: '1',
        });
      });

      describe('삭제 모달창의 "삭제하기" 버튼을 클릭한다', () => {
        it('dispatch 액션이 호출되어야만 한다', () => {
          renderCommentsContainer();

          fireEvent.click(screen.getByText('삭제'));
          screen.getAllByText(/삭제하기/).forEach((button) => {
            fireEvent.click(button);
          });

          expect(mutate).toBeCalledWith({
            commentId: COMMENT_FIXTURE.commentId,
            groupId: '1',
          });
        });
      });
    });

    context('사용자가 비로그인 상태인 경우', () => {
      given('user', () => (null));

      describe('"시작하기" 버튼을 클릭한다', () => {
        it('dispatch 액션 type이 auth/setSignInModalVisible가 호출되어야만 한다', () => {
          renderCommentsContainer();

          fireEvent.click(screen.getByText('시작하기'));

          expect(dispatch).toBeCalledWith({
            type: 'auth/setSignInModalVisible',
            payload: true,
          });
        });
      });
    });
  });
});
