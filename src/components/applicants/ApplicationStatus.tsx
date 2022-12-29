import React, { ReactElement, useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useUpdateApplicant from '@/hooks/api/applicant/useUpdateApplicant';
import { Applicant } from '@/models/group';
import { mobileMediaQuery } from '@/styles/responsive';
import { errorToast } from '@/utils/toast';
import { isEmpty } from '@/utils/utils';

import EmptyStateArea from '../common/EmptyStateArea';

import ApplicantItem from './ApplicantItem';

function ApplicationStatus(): ReactElement {
  const { query, back } = useRouter();
  const { data: applicants } = useFetchApplicants({ suspense: true, useErrorBoundary: true });
  const { mutate } = useUpdateApplicant();

  const onToggleConfirm = useCallback((applicant: Applicant) => mutate({
    ...applicant,
    isConfirm: !applicant.isConfirm,
  }), [mutate]);

  useEffect(() => {
    if (!query?.applicant) {
      return;
    }

    const isApplicant = applicants.some(({ applicant }) => applicant.uid === query.applicant);

    if (!isApplicant) {
      errorToast('신청을 취소한 사용자에요.');
    }
  }, [query, applicants]);

  if (isEmpty(applicants)) {
    return (
      <EmptyStateArea
        emptyText="신청한 사람이 없어요."
        buttonText="돌아가기"
        onClick={back}
      />
    );
  }

  return (
    <ApplicationStatusSection>
      {applicants.map((applicant) => (
        <ApplicantItem
          key={applicant.uid}
          applicationForm={applicant}
          onToggle={onToggleConfirm}
        />
      ))}
    </ApplicationStatusSection>
  );
}

export default ApplicationStatus;

const ApplicationStatusSection = styled.section`
  ${mobileMediaQuery} {
    margin-top: 0px;
  }

  margin-top: 24px;
  overflow-y: auto;

  & > :not(:last-of-type) {
    border-bottom: 0.5px solid ${({ theme }) => theme.accent2};
  }
`;
