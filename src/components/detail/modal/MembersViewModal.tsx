import React from 'react';

import styled from '@emotion/styled';

import ProfileImage from '@/components/common/ProfileImage';
import ViewModalWindow from '@/components/common/ViewModalWindow';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import Divider from '@/styles/Divider';
import { body1Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import styledAnchor from '@/styles/styledAnchor';
import { emptyAThenB } from '@/utils/utils';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

function MembersViewModal({ isVisible, onClose }: Props) {
  const { data: applicants } = useFetchApplicants();

  const confirmedApplicants = applicants.filter(({ isConfirm }) => isConfirm);

  return (
    <ViewModalWindow
      isVisible={isVisible}
      onClose={onClose}
      title={`팀원 ${confirmedApplicants.length}명`}
    >
      <MembersListWrapper>
        {confirmedApplicants.map(({ uid, applicant }) => (
          <MemberWrapper key={uid}>
            <ProfileImage src={applicant.image} size="48px" />
            <MemberInformation>
              <div>{emptyAThenB(applicant.email, applicant.name)}</div>
              <MemberMetaData>
                <div>{applicant.position}</div>
                <Divider />
                {applicant.portfolioUrl && (
                  <a
                    href={applicant.portfolioUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                      {applicant.portfolioUrl}
                  </a>
                )}
              </MemberMetaData>
            </MemberInformation>
          </MemberWrapper>
        ))}
      </MembersListWrapper>
    </ViewModalWindow>
  );
}

export default MembersViewModal;

const MembersListWrapper = styled.div`
  height: 350px;
  overflow-y: auto;
`;

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
`;

const MemberInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12px;

  & > div:first-of-type {
    ${body1Font(true)}
  }
`;

const MemberMetaData = styled.div`
  ${styledAnchor}
  ${subtitle1Font()}

  display: flex;
  flex-direction: row;
  align-items: center;

  & > div:first-of-type {
    color: ${palette.accent6};
  }
`;
