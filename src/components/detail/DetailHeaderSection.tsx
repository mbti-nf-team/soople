import React, { ReactElement, useCallback } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Profile } from '@/models/auth';
import { Group } from '@/models/group';

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

interface Props {
  group: Group;
  writer: Profile;
  currentTime: number;
}

function DetailHeaderSection({ group, writer, currentTime }: Props): ReactElement {
  const {
    title, recruitmentEndDate, createAt, recruitmentEndSetting,
  } = group;
  const { image, name, email } = writer;

  const getRecruitDate = useCallback((time: number) => {
    if (!recruitmentEndDate && recruitmentEndSetting === 'manual') {
      return dayjs(createAt).format('YYYY년 MM월 DD일');
    }

    const isEndDateBeforeCurrentTime = dayjs(recruitmentEndDate).diff(time) >= 0;

    if (isEndDateBeforeCurrentTime) {
      return `${dayjs(time).to(dayjs(recruitmentEndDate))} 마감`;
    }

    return '모집 마감';
  }, [recruitmentEndDate, createAt, recruitmentEndSetting]);

  return (
    <div>
      <h1>{title}</h1>
      <div>
        {image ? (
          <img src={image} alt="writer-img" width="50px" height="50px" />
        ) : (
          <div>이미지 없음</div>
        )}
        <span>
          {name || email}
        </span>
        <div>
          {getRecruitDate(currentTime)}
        </div>
      </div>
    </div>
  );
}

export default DetailHeaderSection;
