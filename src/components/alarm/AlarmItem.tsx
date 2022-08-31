import React, {
  ForwardedRef, forwardRef, memo, ReactElement,
} from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';

import { Alarm, AlarmType } from '@/models/alarm';
import { Category } from '@/models/group';
import { body1Font, subtitle1Font } from '@/styles/fontStyles';

import AlarmConfirmedSvg from '../../assets/icons/img_alarm_confirmed.svg';
import AlarmRejectedSvg from '../../assets/icons/img_alarm_rejected.svg';
import ProfileImage from '../common/ProfileImage';

interface Props {
  alarm: Alarm;
  onClick: (alarmUid: string) => void;
}

const groupCategory: { [K in Category | string]: string; } = {
  study: '스터디',
  project: '프로젝트',
};

function AlarmItem({ alarm, onClick }: Props, ref: ForwardedRef<HTMLAnchorElement>): ReactElement {
  const {
    group, createdAt, type, applicant, isViewed, uid,
  } = alarm;

  const handleClick = () => {
    if (isViewed) {
      return;
    }

    onClick(uid);
  };

  const alarmThumbnail = {
    confirmed: <AlarmConfirmedIcon />,
    rejected: <AlarmRejectedIcon />,
    applied: <ProfileImage src={applicant?.image} />,
  };

  const alarmMessage: { [K in AlarmType]: string; } = {
    confirmed: `축하드려요 🎉 ${groupCategory[group.category]}의 팀원이 되었어요. 지금 바로 팀장이 보낸 메시지를 확인해볼까요?`,
    rejected: `아쉽게도 ${groupCategory[group.category]}의 팀원이 되지 않았어요.`,
    applied: `${applicant?.name}님이 팀원을 신청했어요.`,
  };

  const alarmUrl = type === 'applied' ? `/detail/${group.groupId}/applicants?applicant=${applicant?.uid}` : `/detail/${group.groupId}`;

  return (
    <Link href={alarmUrl} passHref>
      <AlarmItemWrapper ref={ref} isViewed={isViewed} onClick={handleClick}>
        <AlarmItemThumbnail>
          {alarmThumbnail[type]}
        </AlarmItemThumbnail>
        <AlarmItemContents>
          <AlarmItemMetaData>
            <div>
              {group.title}
            </div>
            <div className="date-status">{dayjs(createdAt).fromNow()}</div>
          </AlarmItemMetaData>
          <div>
            {alarmMessage[type]}
          </div>
        </AlarmItemContents>
      </AlarmItemWrapper>
    </Link>
  );
}

export default memo(forwardRef<HTMLAnchorElement, Props>(AlarmItem));

const AlarmItemWrapper = styled.a<{ isViewed: boolean; }>`
  display: flex;
  flex-direction: row;
  padding: 24px 16px 24px 16px;
  border-bottom: 0.5px solid ${({ theme }) => theme.accent2};
  ${({ isViewed }) => !isViewed && css`
    background-color: rgba(73, 157, 223, 0.08);
  `}
`;

const AlarmItemThumbnail = styled.div`
  margin-right: 12px;
`;

const AlarmItemContents = styled.div`
  ${body1Font()};
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.foreground};
`;

const AlarmItemMetaData = styled.div`
  ${body1Font(true)};
  width: 100%;
  color: ${({ theme }) => theme.accent6};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2px;

  .date-status {
    ${subtitle1Font()};
  }
`;

const AlarmConfirmedIcon = styled(AlarmConfirmedSvg)`
  border-radius: 16px;
`;

const AlarmRejectedIcon = styled(AlarmRejectedSvg)`
  border-radius: 16px;
`;
