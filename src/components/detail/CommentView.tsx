import React, {
  ForwardedRef, forwardRef, memo, ReactElement,
} from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Profile } from '@/models/auth';
import { Comment } from '@/models/group';
import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import { emptyAThenB } from '@/utils/utils';

import 'dayjs/locale/ko';

import ProfileImage from '../common/ProfileImage';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
  comment: Comment;
  user: Profile | null;
  onRemove: (commentId: string) => void;
}

function CommentView({
  comment, user, onRemove,
}: Props, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  const {
    writer, content, createdAt, commentId,
  } = comment;
  const isWriter = user?.uid === writer.uid;

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
              onClick={() => onRemove(commentId)}
            >
              삭제
            </RemoveCommentButton>
          )}
        </CommentStatus>
        <CommentContent dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </CommentViewWrapper>
  );
}

export default memo(forwardRef<HTMLDivElement, Props>(CommentView));

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
