import { Comment } from '@/models/group';

import PROFILE_FIXTURE from './profile';

const comment: Comment = {
  groupId: 'id',
  commentId: '1',
  content: 'content',
  writer: PROFILE_FIXTURE,
  createdAt: '2021-11-11',
};

export default comment;
