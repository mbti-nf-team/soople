import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Group } from '@/models/group';

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const useRecruitDateStatus = (group: Group, time: number) => {
  const { recruitmentEndDate, recruitmentEndSetting, createAt } = group;
  const createDate = dayjs(createAt).format('YYYY년 MM월 DD일');
  const [recruitDateStatus, setRecruitDateStatus] = useState<string>(createDate);

  useEffect(() => {
    if (!recruitmentEndDate && recruitmentEndSetting === 'manual') {
      setRecruitDateStatus(createDate);
      return;
    }

    const isEndDateBeforeCurrentTime = dayjs(recruitmentEndDate).diff(time) >= 0;

    if (isEndDateBeforeCurrentTime) {
      setRecruitDateStatus(`${dayjs(time).to(dayjs(recruitmentEndDate))} 마감`);
      return;
    }

    setRecruitDateStatus('모집 마감');
  }, [recruitmentEndDate, recruitmentEndSetting, createDate, time]);

  return recruitDateStatus;
};

export default useRecruitDateStatus;
