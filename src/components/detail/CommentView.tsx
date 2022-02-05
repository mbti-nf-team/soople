import React, { memo, ReactElement, useState } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { User } from 'firebase/auth';
import * as R from 'ramda';

import { Comment } from '@/models/group';
import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import { emptyAThenB } from '@/utils/utils';

import 'dayjs/locale/ko';

import ProfileImage from '../common/ProfileImage';

import AskDeleteCommentModal from './modal/AskDeleteCommentModal';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
  comment: Comment;
  user: User | null;
  onRemove: (commentId: string) => void;
}

function CommentView({ comment, user, onRemove }: Props): ReactElement {
  const [isVisibleModal, setIsVisible] = useState<boolean>(false);
  const {
    writer, content, createdAt, commentId,
  } = comment;
  const isWriter = R.equals(user?.uid, writer.uid);

  return (
    <CommentViewWrapper>
      <ProfileImage src={writer.image} />
      <div>
        <CommentStatus>
          <CommentState>
            <div className="writer-name">{emptyAThenB(writer.email, writer.name)}</div>
            <span>∙</span>
            <div className="recruit-date">{dayjs(createdAt).fromNow()}</div>
          </CommentState>
          {isWriter && (
            <>
              <RemoveCommentButton
                type="button"
                onClick={() => setIsVisible(true)}
              >
                삭제
              </RemoveCommentButton>
              <AskDeleteCommentModal
                isVisible={isVisibleModal}
                onClose={() => setIsVisible(false)}
                onConfirm={() => onRemove(commentId)}
              />
            </>
          )}
        </CommentStatus>
        <CommentContent dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </CommentViewWrapper>
  );
}

export default memo(CommentView);

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
    color: ${palette.accent6};
    margin: 0 3px;
  }

  .recruit-date {
    ${subtitle1Font()};
    color: ${palette.accent6};
  }
`;

const CommentViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 0.5px solid ${palette.accent2};

  & > div {
    width: 100%;
  }
`;

const RemoveCommentButton = styled.button`
  ${subtitle1Font()};
  color: ${palette.accent6};
  background-color: transparent;
`;

const CommentContent = styled.div`
  ${body2Font()};
  margin-left: 12px;
`;
