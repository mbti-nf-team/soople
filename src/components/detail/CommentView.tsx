import {
  ForwardedRef, forwardRef, memo, ReactElement,
} from 'react';

import styled from '@emotion/styled';
import { emptyAThenB } from '@nft-team/core';
import dayjs from 'dayjs';

import { DeleteCommentForm } from '@/hooks/api/comment/useDeleteComment';
import { Comment } from '@/models/group';
import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import { filteredWithSanitizeHtml } from '@/utils/filter';

import ProfileImage from '../common/ProfileImage';

interface Props {
  comment: Comment;
  userUid: string | undefined;
  onRemove: ({ commentId, groupId }: DeleteCommentForm) => void;
}

const commentViewPropsAreEqual = (prevProps: Props, nextProps: Props) => (
  prevProps.comment.commentId === nextProps.comment.commentId
    && prevProps.userUid === nextProps.userUid
    && prevProps.onRemove === nextProps.onRemove
    && prevProps.comment.writer.uid === nextProps.comment.writer.uid
    && prevProps.comment.groupId === nextProps.comment.groupId
);

function CommentView({
  comment, userUid, onRemove,
}: Props, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  const {
    content, createdAt, commentId, groupId, writer,
  } = comment;
  const isWriter = userUid === writer.uid;

  return (
    <CommentViewWrapper ref={ref}>
      <ProfileImage src={writer.image} />
      <div>
        <CommentStatus>
          <CommentState>
            <div className="writer-name">{emptyAThenB(writer.email, writer.name)}</div>
            <span>∙</span>
            <div className="recruit-date">{dayjs(createdAt).fromNow()}</div>
          </CommentState>
          {isWriter && (
            <RemoveCommentButton
              type="button"
              onClick={() => onRemove({ commentId, groupId })}
            >
              삭제
            </RemoveCommentButton>
          )}
        </CommentStatus>
        <CommentContent dangerouslySetInnerHTML={{ __html: filteredWithSanitizeHtml(content) }} />
      </div>
    </CommentViewWrapper>
  );
}

export default memo(forwardRef<HTMLDivElement, Props>(CommentView), commentViewPropsAreEqual);

const CommentStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 12px;
`;

const CommentState = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .writer-name {
    ${body1Font(true)};
  }

  span {
    ${subtitle1Font()};
    color: ${({ theme }) => theme.accent6};
    margin: 0 3px;
  }

  .recruit-date {
    ${subtitle1Font()};
    color: ${({ theme }) => theme.accent6};
  }
`;

const CommentViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 0.5px solid ${({ theme }) => theme.accent2};

  & > div {
    width: 100%;
  }
`;

const RemoveCommentButton = styled.button`
  ${subtitle1Font()};
  color: ${({ theme }) => theme.accent6};
  background-color: transparent;
`;

const CommentContent = styled.div`
  ${body2Font()};
  margin-left: 12px;
`;
