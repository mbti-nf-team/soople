import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';

import useCurrentTime from '@/hooks/useCurrentTime';
import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Group } from '@/models/group';
import Divider from '@/styles/Divider';
import {
  body1Font, body2Font, h3Font,
} from '@/styles/fontStyles';
import palette from '@/styles/palette';

interface Props {
  group: Group;
  onClick: (groupId: string) => void;
}

function MyGroup({ group, onClick }: Props): ReactElement {
  const {
    title, content, createdAt, groupId, numberApplicants,
  } = group;
  const currentTime = useCurrentTime(group);
  const recruitDateStatus = useRecruitDateStatus(group, currentTime);

  return (
    <MyGroupWrapper
      role="menuitem"
      onClick={() => onClick(groupId)}
      tabIndex={0}
    >
      <MyGroupContents>
        <div className="group-title">{title}</div>
        <div className="group-content">
          {content}
        </div>
      </MyGroupContents>
      <GroupMetaData>
        <div className="date-status">{recruitDateStatus}</div>
        <Divider />
        <div className="number-applied">{`${numberApplicants}명 신청 중`}</div>
        <Divider />
        <div>{dayjs(createdAt).format('YYYY년 MM월 DD일')}</div>
      </GroupMetaData>
    </MyGroupWrapper>
  );
}

export default MyGroup;

const MyGroupWrapper = styled.div`
  cursor: pointer;
  `;

const MyGroupContents = styled.div`
  padding-bottom: 16px;

.group-title {
  ${h3Font(true)};
  padding-bottom: 4px;
}

.group-content {
  ${body1Font()};
  color: ${palette.accent7};
}
`;

const GroupMetaData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${body2Font()};
  color: ${palette.accent6};

  .date-status {
  ${body2Font(true)};
  color: ${palette.foreground};
  }

  .number-applied {
  color: ${palette.foreground};
  }
`;
