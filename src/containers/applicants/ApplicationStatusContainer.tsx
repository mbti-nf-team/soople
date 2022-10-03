import React, { ReactElement, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import ApplicationStatus from '@/components/applicants/ApplicationStatus';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useUpdateApplicant from '@/hooks/api/applicant/useUpdateApplicant';
import useResponsive from '@/hooks/useResponsive';
import { Applicant } from '@/models/group';
import { DetailLayout } from '@/styles/Layout';
import { mq2 } from '@/styles/responsive';
import { errorToast } from '@/utils/toast';

function ApplicationStatusContainer(): ReactElement {
  const { query, back } = useRouter();
  const { isMobile } = useResponsive();
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
    <ApplicationStatusDetailLayout>
      <ApplicationStatus
        goBack={back}
        applicants={applicants}
        onToggleConfirm={onToggleConfirm}
      />
      {isMobile && (
        <GradientBlock data-testid="gradient-block" />
      )}
    </ApplicationStatusDetailLayout>
  );
}

export default ApplicationStatusContainer;

const ApplicationStatusDetailLayout = styled(DetailLayout)`
  ${mq2({
    height: ['calc(100vh - 124px)', 'auto'],
  })};

  max-width: 686px;
  width: calc(100% - 2.5rem);
  overflow-y: auto;
`;

const GradientBlock = styled.div`
  position: absolute;
  bottom: 68px;
  width: 100%;
  height: 40px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
`;
