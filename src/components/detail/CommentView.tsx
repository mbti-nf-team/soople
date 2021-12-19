import React, { ReactElement } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Comment } from '@/models/group';
import { emptyAThenB } from '@/utils/utils';

import 'dayjs/locale/ko';

import ProfileImage from '../common/ProfileImage';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
  comment: Comment;
}

function CommentView({ comment }: Props): ReactElement {
  const { writer, content, createdAt } = comment;

  return (
    <li>
      <ProfileImage src={writer.image} />
      <span>{emptyAThenB(writer.email, writer.name)}</span>
      <div>{content}</div>
      <div>{dayjs(createdAt).fromNow()}</div>
    </li>
  );
}

export default CommentView;
