import { useMemo, useState } from 'react';
import { useInterval } from 'react-use';

import { Group } from '@/models/group';
import { isCurrentTimeBeforeEndDate, isRecruitCompletedAndManual } from '@/utils/utils';

const useCurrentTime = (group?: Group) => {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const delay = useMemo(() => {
    if (!group) {
      return null;
    }

    if (isRecruitCompletedAndManual(group)) {
      return null;
    }

    if (isCurrentTimeBeforeEndDate(group.recruitmentEndDate, currentTime)) {
      return 1000;
    }

    return null;
  }, [group, currentTime]);

  useInterval(() => setCurrentTime(Date.now()), delay);

  return useMemo(() => currentTime, [currentTime]);
};

export default useCurrentTime;
