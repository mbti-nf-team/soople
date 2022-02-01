import React, { ReactElement, useCallback } from 'react';

import { useRouter } from 'next/router';

import ApplicationStatus from '@/components/applicants/ApplicationStatus';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useUpdateApplicant from '@/hooks/api/applicant/useUpdateApplicant';
import { Applicant } from '@/models/group';
import { DetailLayout } from '@/styles/Layout';

function ApplicationStatusContainer(): ReactElement {
  const { back } = useRouter();
  const { data: applicants, isLoading } = useFetchApplicants();
  const { mutate } = useUpdateApplicant();

  const onToggleConfirm = useCallback((applicant: Applicant) => mutate({
    ...applicant,
    isConfirm: !applicant.isConfirm,
  }), [mutate]);

  if (isLoading) {
    return <DetailLayout>로딩중...</DetailLayout>;
  }

  return (
    <DetailLayout>
      <ApplicationStatus
        goBack={back}
        applicants={applicants}
        onToggleConfirm={onToggleConfirm}
      />
    </DetailLayout>
  );
}

export default ApplicationStatusContainer;
