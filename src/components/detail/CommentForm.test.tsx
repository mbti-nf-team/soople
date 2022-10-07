import { fireEvent, render, screen } from '@testing-library/react';

import InjectResponsiveContext from '@/test/InjectResponsiveContext';

import PROFILE_FIXTURE from '../../../fixtures/profile';

import CommentForm from './CommentForm';

describe('CommentForm', () => {
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleSubmit.mockClear();
  });

  const renderCommentForm = () => render((
    <InjectResponsiveContext width={given.width}>
      <CommentForm
        user={given.user}
        onSubmit={handleSubmit}
      />
    </InjectResponsiveContext>
  ));

  context('사용자가 로그인한 경우', () => {
    given('user', () => PROFILE_FIXTURE);

    context('모바일인 경우', () => {
      given('width', () => 400);

      it('"댓글 남기기" 버튼의 height는 "32px"이어야만 한다', () => {
        renderCommentForm();

        expect(screen.getByText('댓글 남기기')).toHaveStyle({
          height: '32px',
        });
      });
    });

    describe('Textarea change 이벤트가 발생한다', () => {
      const content = '댓글 내용';

      it('값이 변해야만 한다', () => {
        const { container } = renderCommentForm();

        fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요'), {
          target: {
            value: content,
          },
        });

        expect(container).toHaveTextContent(content);
      });
    });

    describe('"댓글 남기기" 버튼을 클릭한다', () => {
      const content = '댓글 내용';

      context('댓글 입력 값이 존재하는 경우', () => {
        it('클릭 이벤트가 발생해야만 한다', () => {
          renderCommentForm();

          fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요'), {
            target: {
              value: content,
            },
          });

          fireEvent.click(screen.getByText('댓글 남기기'));

          expect(handleSubmit).toBeCalledWith({
            content,
            writer: PROFILE_FIXTURE,
          });
        });
      });

      context('댓글 입력 값이 존재하지 않는 경우', () => {
        it('클릭 이벤트가 발생하지 않는다', () => {
          renderCommentForm();

          fireEvent.change(screen.getByPlaceholderText('댓글을 입력하세요'), {
            target: {
              value: '',
            },
          });

          const button = screen.getByText('댓글 남기기');

          fireEvent.click(button);

          expect(button).toHaveAttribute('disabled');
          expect(handleSubmit).not.toBeCalled();
        });
      });
    });
  });

  context('사용자가 로그인하지 않은 경우', () => {
    given('user', () => null);

    it('"댓글 남기기" 버튼이 보이지 않는다', () => {
      const { container } = renderCommentForm();

      expect(container).not.toHaveTextContent('댓글 남기기');
    });
  });
});
