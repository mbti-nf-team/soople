import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { Applicant } from '@/models/group';
import { mobileMediaQuery } from '@/styles/responsive';
import { isEmpty } from '@/utils/utils';

import EmptyStateArea from '../common/EmptyStateArea';

import ApplicantItem from './ApplicantItem';

interface Props {
  applicants: Applicant[];
  onToggleConfirm: (applicant: Applicant) => void;
  goBack: () => void;
}

function ApplicationStatus({ applicants, onToggleConfirm, goBack }: Props): ReactElement {
  if (isEmpty(applicants)) {
    return (
      <EmptyStateArea
        emptyText="신청한 사람이 없어요."
        buttonText="돌아가기"
        onClick={goBack}
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
