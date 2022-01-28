import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';

import { Group } from '@/models/group';

interface Props {
  group: Group;
  onClick: (groupId: string) => void;
}

function RecruitedPost({ group, onClick }: Props): ReactElement {
  const {
    title, content, createdAt, groupId,
  } = group;

  return (
    <RecruitedPostWrapper
      role="menuitem"
      onClick={() => onClick(groupId)}
      tabIndex={0}
    >
      <h3>{title}</h3>
      <div>{content}</div>
      <div>
        <div>{dayjs(createdAt).format('YYYY년 MM월 DD일')}</div>
      </div>
    </RecruitedPostWrapper>
  );
}

export default RecruitedPost;

const RecruitedPostWrapper = styled.div`
  cursor: pointer;
`;
