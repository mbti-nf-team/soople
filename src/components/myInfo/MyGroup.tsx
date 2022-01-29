import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';

import { Group } from '@/models/group';

interface Props {
  group: Group;
  onClick: (groupId: string) => void;
}

function MyGroup({ group, onClick }: Props): ReactElement {
  const {
    title, content, createdAt, groupId, numberApplicants,
  } = group;

  return (
    <MyGroupWrapper
      role="menuitem"
      onClick={() => onClick(groupId)}
      tabIndex={0}
    >
      <h3>{title}</h3>
      <div>{content}</div>
      <div>
        <div>{`${numberApplicants}명 신청 중`}</div>
        <div>{dayjs(createdAt).format('YYYY년 MM월 DD일')}</div>
      </div>
    </MyGroupWrapper>
  );
}

export default MyGroup;

const MyGroupWrapper = styled.div`
  cursor: pointer;
`;
