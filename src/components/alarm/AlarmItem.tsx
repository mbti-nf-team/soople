import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';

import { Alarm, AlarmType } from '@/models/alarm';
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
    group, createdAt, type, applicant,
  } = alarm;

  const alarmThumbnail = {
    confirmed: <AlarmConfirmedIcon />,
    rejected: <AlarmRejectedIcon />,
    applied: <ProfileImage src={applicant?.image} />,
  };

  const alarmMessage: { [K in AlarmType]: string; } = {
    confirmed: `축하드려요 🎉  ${groupCategory[group.category]}의 팀원이 되었어요. 지금 바로 팀장이 보낸 메시지를 확인해볼까요?`,
    rejected: `아쉽게도 ${groupCategory[group.category]}의 팀원이 되지 않았어요.`,
    applied: `${applicant?.name}님이 팀원을 신청했어요.`,
  };

  const alarmUrl = type === 'applied' ? `/detail/${group.groupId}/applicants?applicant=${applicant?.uid}` : `/detail/${group.groupId}`;

  return (
    <Link href={alarmUrl} passHref>
      <AlarmItemWrapper>
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
  ${body1Font()};
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${palette.foreground};
`;

const AlarmItemMetaData = styled.div`
  ${body1Font(true)};
  width: 100%;
  color: ${palette.accent6};
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
