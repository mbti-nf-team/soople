import { useMemo, useState } from 'react';
import { useInterval } from 'react-use';

import dayjs from 'dayjs';

import { Group } from '@/models/group';
import { isRecruitCompletedAndManual } from '@/utils/utils';

const useCurrentTime = (group: Group) => {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const delay = useMemo(() => {
    if (isRecruitCompletedAndManual(group)) {
      return null;
    }

    const isCurrentTimeBeforeEndDate = dayjs(group.recruitmentEndDate).diff(currentTime) >= 0;

    if (isCurrentTimeBeforeEndDate) {
      return 1000;
    }

    return null;
  }, [group, currentTime]);

  useInterval(() => setCurrentTime(Date.now()), delay);

  return currentTime;
};

export default useCurrentTime;
