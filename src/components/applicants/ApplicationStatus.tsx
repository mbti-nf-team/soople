import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import * as R from 'ramda';

import { Applicant } from '@/models/group';
import palette from '@/styles/palette';

import EmptyStateArea from '../common/EmptyStateArea';

import ApplicantItem from './ApplicantItem';

interface Props {
  applicants: Applicant[];
  onToggleConfirm: (applicant: Applicant) => void;
  goBack: () => void;
}

function ApplicationStatus({ applicants, onToggleConfirm, goBack }: Props): ReactElement {
  if (R.empty(applicants)) {
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
  margin-top: 24px;

  & > :not(:last-of-type) {
    border-bottom: 0.5px solid ${palette.accent2};
  }
`;
