import React, {
  ReactElement, useCallback, useEffect, useMemo,
} from 'react';
import { useSelector } from 'react-redux';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';

import ApplicationStatusHeader from '@/components/applicants/ApplicationStatusHeader';
import useCurrentTime from '@/hooks/useCurrentTime';
import { Group } from '@/models/group';
import { updateCompletedApply } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup, isCurrentTimeBeforeEndDate } from '@/utils/utils';

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

function ApplicationStatusHeaderContainer(): ReactElement {
  const { back, replace } = useRouter();
  const dispatch = useAppDispatch();
  const applicants = useSelector(getGroup('applicants'));
  const group = useSelector(getGroup('group')) as Group;
  const currentTime = useCurrentTime(group);

  const onSubmit = useCallback((
    numberConfirmApplicants: number,
  ) => dispatch(updateCompletedApply(group, numberConfirmApplicants)), [dispatch]);

  const timeRemaining = useMemo(() => {
    if (!isCurrentTimeBeforeEndDate(group.recruitmentEndDate, currentTime)) {
      return null;
    }

    return dayjs(currentTime).to(dayjs(group.recruitmentEndDate), true);
  }, [currentTime, group.recruitmentEndDate]);

  useEffect(() => {
    const { isCompleted, groupId } = group;

    if (isCompleted) {
      replace(`/detail/${groupId}`);
    }
  }, [group]);

  return (
    <ApplicationStatusHeader
      goBack={back}
      onSubmit={onSubmit}
      applicants={applicants}
      timeRemaining={timeRemaining}
    />
  );
}

export default ApplicationStatusHeaderContainer;
