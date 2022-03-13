import React, {
  ReactElement,
} from 'react';

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
import { removeAllHtml } from '@/utils/filter';

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
  group: Group;
  onClick: (groupId: string) => void;
}

function MyGroup({ group, onClick }: Props): ReactElement {
  const {
    title, content, createdAt, groupId, numberApplicants,
    recruitmentEndDate, isCompleted, thumbnail, shortDescription,
  } = group;
  const currentTime = useCurrentTime(group);
  const status = useGroupRecruitmentStatus(group) as RecruitmentStatus;

  const recruitStatus = (automaticRecruitingText: string): {
    [K in RecruitmentStatus]: string;
  } => ({
    manualRecruiting: '모집 중',
    automaticAfterCompletedRecruitment: '모집 완료',
    automaticBeforeCompletedRecruitment: '모집 완료',
    manualCompletedRecruitment: '모집 완료',
    automaticCloseRecruitment: '모집 마감',
    automaticRecruiting: automaticRecruitingText,
  });

  const numberApplied = isCompleted ? `${numberApplicants}명` : `${numberApplicants}명 신청 중`;
  const dateStatus = recruitStatus(`${dayjs(currentTime).to(dayjs(recruitmentEndDate))} 마감`)[status];

  return (
    <MyGroupWrapper
      role="listitem"
      onClick={() => onClick(groupId)}
      tabIndex={0}
    >
      <div>
        <MyGroupContents>
          <div className="group-title">{title}</div>
          <div className="group-content">
            {shortDescription || removeAllHtml(content)}
          </div>
        </MyGroupContents>
        <GroupMetaData status={status}>
          <div className="date-status" data-testid="date-status">{dateStatus}</div>
          <Divider />
          <div className="number-applied">{numberApplied}</div>
          <Divider />
          <div>{dayjs(createdAt).format('YYYY년 MM월 DD일')}</div>
        </GroupMetaData>
      </div>
      {thumbnail && (
        <Thumbnail src={thumbnail} alt="thumbnail" />
      )}
    </MyGroupWrapper>
  );
}

export default MyGroup;

const MyGroupWrapper = styled.div`
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
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
    word-break: break-all;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

const Thumbnail = styled.img`
  width: 174px;
  height: 96px;
  border-radius: 8px;
  margin-left: 24px;
`;
