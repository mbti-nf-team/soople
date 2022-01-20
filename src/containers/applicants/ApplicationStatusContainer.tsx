import React, { ReactElement, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ApplicationStatus from '@/components/applicants/ApplicationStatus';
import { Applicant, Group } from '@/models/group';
import { loadApplicants, updateApplicant } from '@/reducers/groupSlice';
import { useAppDispatch } from '@/reducers/store';
import { DetailLayout } from '@/styles/Layout';
import { getGroup } from '@/utils/utils';

function ApplicationStatusContainer(): ReactElement {
  const dispatch = useAppDispatch();
  const applicants = useSelector(getGroup('applicants'));
  const group = useSelector(getGroup('group')) as Group;

  const onToggleConfirm = useCallback((applicant: Applicant) => dispatch(updateApplicant({
    ...applicant,
    isConfirm: !applicant.isConfirm,
  })), [dispatch]);

  useEffect(() => {
    dispatch(loadApplicants(group.groupId));
  }, []);

  return (
    <DetailLayout>
      <ApplicationStatus
        applicants={applicants}
        onToggleConfirm={onToggleConfirm}
      />
    </DetailLayout>
  );
}

export default ApplicationStatusContainer;
