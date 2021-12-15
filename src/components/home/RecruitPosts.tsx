import React, { ReactElement } from 'react';

import { Group } from '@/models/group';

import RecruitPost from './RecruitPost';

interface Props {
  groups: Group[];
}

function RecruitPosts({ groups }: Props): ReactElement {
  return (
    <div>
      {groups.map((group) => (
        <RecruitPost
          key={group.groupId}
          group={group}
        />
      ))}
    </div>
  );
}

export default RecruitPosts;
