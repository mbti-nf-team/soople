import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Group } from '@/models/group';
import { isCurrentTimeBeforeEndDate, isRecruitCompletedAndManual } from '@/utils/utils';

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const useRecruitDateStatus = (group: Group, time: number) => {
  const { recruitmentEndDate, createdAt } = group;
  const createdDate = dayjs(createdAt).format('YYYY년 MM월 DD일');
  const [recruitDateStatus, setRecruitDateStatus] = useState<string>(createdDate);

  useEffect(() => {
    if (isRecruitCompletedAndManual(group)) {
      setRecruitDateStatus(createdDate);
      return;
    }

    if (isCurrentTimeBeforeEndDate(recruitmentEndDate, time)) {
      setRecruitDateStatus(`${dayjs(time).to(dayjs(recruitmentEndDate))} 마감`);
      return;
    }

    setRecruitDateStatus(createdDate);
  }, [group, createdDate, time]);

  return recruitDateStatus;
};

export default useRecruitDateStatus;
