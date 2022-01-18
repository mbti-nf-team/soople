import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ApplicationStatus from '@/components/applicants/ApplicationStatus';
import { loadApplicants } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { DetailLayout } from '@/styles/Layout';
import { getGroup } from '@/utils/utils';

function ApplicationStatusContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const applicants = useSelector(getGroup('applicants'));
  const groupId = useSelector(getGroup('groupId')) as string;

  useEffect(() => {
    dispatch(loadApplicants(groupId));
  }, []);

  return (
    <DetailLayout>
      <ApplicationStatus applicants={applicants} />
    </DetailLayout>
  );
}

export default ApplicationStatusContainer;
