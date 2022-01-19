import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import { Applicant } from '@/models/group';
import palette from '@/styles/palette';

import ApplicantItem from './ApplicantItem';

interface Props {
  applicants: Applicant[];
  onToggleConfirm: (applicant: Applicant) => void;
}

function ApplicationStatus({ applicants, onToggleConfirm }: Props): ReactElement {
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
