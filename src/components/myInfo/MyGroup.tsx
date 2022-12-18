import React, {
  ForwardedRef, forwardRef, memo, ReactElement,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';

import useCurrentTime from '@/hooks/useCurrentTime';
import useGroupRecruitmentStatus from '@/hooks/useGroupRecruitmentStatus';
import { Group, RecruitmentStatus } from '@/models/group';
import Divider from '@/styles/Divider';
import {
  body1Font, body2Font, h3Font,
} from '@/styles/fontStyles';
import mq, { mobileMediaQuery } from '@/styles/responsive';
import { removeAllHtml } from '@/utils/filter';

interface Props {
  group: Group;
}

function MyGroup({ group }: Props, ref: ForwardedRef<HTMLAnchorElement>): ReactElement {
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
    <MyGroupLinkItem
      href={`/detail/${groupId}`}
      role="listitem"
      ref={ref}
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
      <ThumbnailWrapper>
        <Thumbnail
          fill
          src={thumbnail}
          alt="thumbnail"
          blurDataURL={thumbnail}
          placeholder="blur"
          sizes="(max-width: 500px) 100vw, 33vw"
        />
      </ThumbnailWrapper>
      )}
    </MyGroupLinkItem>
  );
}

export default memo(forwardRef<HTMLAnchorElement, Props>(MyGroup));

const MyGroupLinkItem = styled(Link)`
  ${mq({
    flexDirection: ['column', 'row'],
  })};

  cursor: pointer;
  outline: none;
  display: flex;
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
    color: ${({ theme }) => theme.accent7};
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
  color: ${({ theme }) => theme.accent6};

  .date-status {
    ${body2Font(true)};
    color: ${({ theme }) => theme.foreground};

    ${({ status, theme }) => status === 'automaticCloseRecruitment' && css`
      color: ${theme.accent6};
    `}
  }

  .number-applied {
    color: ${({ theme }) => theme.foreground};
  }
`;

const Thumbnail = styled(Image)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 8px;
`;

const ThumbnailWrapper = styled.div`
  ${mobileMediaQuery} {
    width: 100%;
    padding-top: calc(100% - 154px);
    margin-top: 24px;
    margin-left: 0px;
  }

  position: relative;
  padding-top: 96px;
  width: 174px;
  min-width: 174px;
  margin-left: 24px;
`;
