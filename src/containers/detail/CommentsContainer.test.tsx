import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useAddComment from '@/hooks/api/comment/useAddComment';
import useDeleteComment from '@/hooks/api/comment/useDeleteComment';
import useFetchCommentCount from '@/hooks/api/comment/useFetchCommentCount';
import useInfiniteFetchComments from '@/hooks/api/comment/useInfiniteFetchComments';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';

import COMMENT_FIXTURE from '../../../fixtures/comment';

import CommentsContainer from './CommentsContainer';

jest.mock('@/hooks/api/comment/useInfiniteFetchComments');
jest.mock('@/hooks/api/comment/useFetchCommentCount');
jest.mock('@/hooks/api/comment/useDeleteComment');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/comment/useAddComment');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      id: '1',
    },
  })),
}));

describe('CommentsContainer', () => {
  const mutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: given.user,
    }));
    (useAddComment as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useDeleteComment as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useInfiniteFetchComments as jest.Mock).mockImplementation(() => ({
      query: {
        data: {
          pages: [{
            items: [COMMENT_FIXTURE],
          }],
        },
        isFetchingNextPage: false,
      },
      refState: {
        lastItemRef: jest.fn(),
        wrapperRef: createRef(),
      },
    }));
    (useFetchCommentCount as jest.Mock).mockImplementation(() => ({
      data: 15,
    }));
  });

  const renderCommentsContainer = () => render((
    <ReactQueryWrapper>
      <CommentsContainer />
    </ReactQueryWrapper>
  ));

  describe('"댓글 남기기" 버튼을 클릭한다', () => {
    const commentValue = '댓글 내용';
    const writer = {
      name: 'test',
      uid: '12345678',
    };

    context('사용자가 로그인 상태인 경우', () => {
      given('user', () => writer);

      it('mutate 액션이 호출되야만 한다', () => {
        renderCommentsContainer();

        fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요'), {
          target: {
            value: commentValue,
          },
        });

        fireEvent.click(screen.getByText('댓글 남기기'));

        expect(mutate).toHaveBeenCalledWith({
          content: commentValue,
          writer,
          groupId: '1',
        });
      });

      describe('삭제 모달창의 "삭제하기" 버튼을 클릭한다', () => {
        it('remove mutate 액션이 호출되어야만 한다', () => {
          renderCommentsContainer();

          fireEvent.click(screen.getByText('삭제'));

          expect(mutate).toHaveBeenCalledWith({
            commentId: COMMENT_FIXTURE.commentId,
            groupId: '1',
          });
        });
      });
    });
  });
});
