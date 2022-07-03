import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Group } from '@/models/group';
import { isCurrentTimeBeforeEndDate, isRecruitCompletedAndManual } from '@/utils/utils';

import 'dayjs/locale/ko';

import useCurrentTime from './useCurrentTime';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const useRecruitDateStatus = (group: Group) => {
  const currentTime = useCurrentTime(group);
  const { recruitmentEndDate, createdAt } = group;
  const createdDate = dayjs(createdAt).format('YYYY년 MM월 DD일');
  const [recruitDateStatus, setRecruitDateStatus] = useState<string>(createdDate);

  useEffect(() => {
    if (isRecruitCompletedAndManual(group)) {
      setRecruitDateStatus(createdDate);
      return;
    }

    if (isCurrentTimeBeforeEndDate(recruitmentEndDate, currentTime)) {
      setRecruitDateStatus(`${dayjs(currentTime).to(dayjs(recruitmentEndDate))} 마감`);
      return;
    }

    setRecruitDateStatus(createdDate);
  }, [group, createdDate, currentTime, recruitmentEndDate]);

  return recruitDateStatus;
};

export default useRecruitDateStatus;
