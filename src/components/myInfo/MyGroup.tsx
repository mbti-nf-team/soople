import React, { ReactElement, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import useCurrentTime from '@/hooks/useCurrentTime';
import useGroupRecruitmentStatus from '@/hooks/useGroupRecruitmentStatus';
import { Group, RecruitmentStatus } from '@/models/group';
import Divider from '@/styles/Divider';
import {
  body1Font, body2Font, h3Font,
} from '@/styles/fontStyles';
import palette from '@/styles/palette';

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
  group: Group;
  onClick: (groupId: string) => void;
}

function MyGroup({ group, onClick }: Props): ReactElement {
  const {
    title, content, createdAt, groupId, numberApplicants, recruitmentEndDate, isCompleted,
  } = group;
  const currentTime = useCurrentTime(group);
  const status = useGroupRecruitmentStatus(group);
  const [recruitDateStatus, setRecruitDateStatus] = useState<string>('');

  useEffect(() => {
    if (status === 'manualRecruiting') {
      setRecruitDateStatus('모집 중');
      return;
    }

    if (status === 'automaticAfterCompletedRecruitment' || status === 'automaticBeforeCompletedRecruitment' || status === 'manualCompletedRecruitment') {
      setRecruitDateStatus('모집 완료');
      return;
    }

    if (status === 'automaticCloseRecruitment') {
      setRecruitDateStatus('모집 마감');
      return;
    }

    if (status === 'automaticRecruiting') {
      setRecruitDateStatus(`${dayjs(currentTime).to(dayjs(recruitmentEndDate))} 마감`);
    }
  }, [group, status]);

  const numberApplied = isCompleted ? `${numberApplicants}명` : `${numberApplicants}명 신청 중`;

  return (
    <MyGroupWrapper
      role="listitem"
      onClick={() => onClick(groupId)}
      tabIndex={0}
    >
      <MyGroupContents>
        <div className="group-title">{title}</div>
        <div className="group-content">
          {content}
        </div>
      </MyGroupContents>
      <GroupMetaData status={status}>
        <div className="date-status">{recruitDateStatus}</div>
        <Divider />
        <div className="number-applied">{numberApplied}</div>
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

const GroupMetaData = styled.div<{ status: RecruitmentStatus; }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${body2Font()};
  color: ${palette.accent6};

  .date-status {
    ${body2Font(true)};
    color: ${palette.foreground};

    ${({ status }) => status === 'automaticCloseRecruitment' && css`
      color: ${palette.accent6};
    `}
  }

  .number-applied {
    color: ${palette.foreground};
  }
`;
