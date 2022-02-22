import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';

import { Alarm } from '@/models/alarm';
import { Category } from '@/models/group';
import { body1Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import 'dayjs/locale/ko';

import AlarmConfirmedSvg from '../../assets/icons/img_alarm_confirmed.svg';
import AlarmRejectedSvg from '../../assets/icons/img_alarm_rejected.svg';
import ProfileImage from '../common/ProfileImage';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
  alarm: Alarm;
}

const groupCategory: { [K in Category | string]: string; } = {
  study: '스터디',
  project: '프로젝트',
};

function AlarmItem({ alarm }: Props): ReactElement {
  const {
    group, createdAt, user, type,
  } = alarm;

  const alarmThumbnail = {
    confirmed: <AlarmConfirmedIcon />,
    rejected: <AlarmRejectedIcon />,
    applied: <ProfileImage src={user.image} />,
  };

  const alarmMessage = {
    confirmed: `축하드려요 🎉 ${groupCategory[group.category]}의 팀원이 되었어요. 지금 바로 팀장이 보낸 메시지를 확인해볼까요?`,
    rejected: `아쉽게도 ${groupCategory[group.category]}의 팀원이 되지 않았어요.`,
    applied: `${user.name}님이 팀원을 신청했어요.`,
  };

  const alarmLink = type === 'applied' ? `detail/${group.groupId}/applicants` : `detail/${group.groupId}`;

  return (
    <Link href={alarmLink} passHref>
      <AlarmItemWrapper>
        <AlarmItemThumbnail>
          {alarmThumbnail[type]}
        </AlarmItemThumbnail>
        <AlarmItemContents>
          <AlarmItemMetaData>
            {group.title}
            <div className="date-status">{dayjs(createdAt).fromNow()}</div>
          </AlarmItemMetaData>
          {alarmMessage[type]}
        </AlarmItemContents>
      </AlarmItemWrapper>
    </Link>
  );
}

export default AlarmItem;

const AlarmItemWrapper = styled.a`
  display: flex;
  flex-direction: row;
  padding: 24px 0px 24px 0px;
  border-bottom: 0.5px solid ${palette.accent2};
`;

const AlarmItemThumbnail = styled.div`
  margin-right: 12px;
`;

const AlarmItemContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${body1Font()};
  color: ${palette.foreground};
`;

const AlarmItemMetaData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2px;
  ${body1Font(true)};
  color: ${palette.accent6};

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
