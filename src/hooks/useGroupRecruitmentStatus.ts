import { useEffect, useState } from 'react';

import { Group, RecruitmentStatus } from '@/models/group';
import { isCurrentTimeBeforeEndDate } from '@/utils/utils';

import useCurrentTime from './useCurrentTime';

const useGroupRecruitmentStatus = (group: Group) => {
  const currentTime = useCurrentTime(group);
  const [groupRecruitmentStatus, setRecruitmentStatus] = useState<RecruitmentStatus>('manualRecruiting');

  useEffect(() => {
    const { isCompleted, recruitmentEndSetting, recruitmentEndDate } = group;

    if (isCompleted && recruitmentEndSetting === 'manual') {
      setRecruitmentStatus('manualCompletedRecruitment');
      return;
    }

    if (isCompleted && recruitmentEndSetting === 'automatic') {
      const isTimeBeforeDate = isCurrentTimeBeforeEndDate(recruitmentEndDate, currentTime);

      setRecruitmentStatus(isTimeBeforeDate ? 'automaticBeforeCompletedRecruitment' : 'automaticAfterCompletedRecruitment');
      return;
    }

    if (!recruitmentEndDate && recruitmentEndSetting === 'manual') {
      setRecruitmentStatus('manualRecruiting');
      return;
    }

    if (isCurrentTimeBeforeEndDate(recruitmentEndDate, currentTime)) {
      setRecruitmentStatus('automaticRecruiting');
      return;
    }

    setRecruitmentStatus('automaticCloseRecruitment');
  }, [group, currentTime]);

  return groupRecruitmentStatus;
};

export default useGroupRecruitmentStatus;
