import React from 'react';

import styled from '@emotion/styled';

import ProfileImage from '@/components/common/ProfileImage';
import ViewModalWindow from '@/components/common/ViewModalWindow';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import { emptyAThenB } from '@/utils/utils';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

function ApplicantsViewModal({ isVisible, onClose }: Props) {
  const { data: applicants } = useFetchApplicants();

  const confirmedApplicants = applicants.filter(({ isConfirm }) => isConfirm);

  return (
    <ViewModalWindow
      isVisible={isVisible}
      onClose={onClose}
      title={`팀원 ${confirmedApplicants.length}명`}
    >
      <ApplicantsListWrapper>
        {confirmedApplicants.map(({ uid, applicant }) => (
          <div key={uid}>
            <ProfileImage src={applicant.image} size="48px" />
            <div>{emptyAThenB(applicant.email, applicant.name)}</div>
            <div>{applicant.position}</div>
            <div>{applicant.portfolioUrl}</div>
          </div>
        ))}
      </ApplicantsListWrapper>
    </ViewModalWindow>
  );
}

export default ApplicantsViewModal;

const ApplicantsListWrapper = styled.div`
  height: 350px;
  overflow-y: auto;
`;
