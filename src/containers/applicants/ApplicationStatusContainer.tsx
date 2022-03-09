import React, { ReactElement, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import ApplicationStatus from '@/components/applicants/ApplicationStatus';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useUpdateApplicant from '@/hooks/api/applicant/useUpdateApplicant';
import { Applicant } from '@/models/group';
import { DetailLayout } from '@/styles/Layout';
import { errorToast } from '@/utils/toast';

function ApplicationStatusContainer(): ReactElement {
  const { query, back } = useRouter();
  const { data: applicants, isLoading, isSuccess } = useFetchApplicants();
  const { mutate } = useUpdateApplicant();

  const onToggleConfirm = useCallback((applicant: Applicant) => mutate({
    ...applicant,
    isConfirm: !applicant.isConfirm,
  }), [mutate]);

  useEffect(() => {
    if (!query?.applicant || isLoading || !isSuccess) {
      return;
    }

    const isApplicant = applicants.some(({ applicant }) => applicant.uid === query.applicant);

    if (!isApplicant) {
      errorToast('신청을 취소한 사용자에요.');
    }
  }, [query, applicants, isLoading, isSuccess]);

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
