import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import ApplicationStatusHeader from '@/components/applicants/ApplicationStatusHeader';
import { Group } from '@/models/group';
import { updateCompletedApply } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { getGroup } from '@/utils/utils';

function ApplicationStatusHeaderContainer(): ReactElement {
  const { back, replace } = useRouter();
  const dispatch = useAppDispatch();
  const applicants = useSelector(getGroup('applicants'));
  const group = useSelector(getGroup('group')) as Group;

  const onSubmit = useCallback(() => dispatch(updateCompletedApply(group)), [dispatch]);

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
    />
  );
}

export default ApplicationStatusHeaderContainer;
