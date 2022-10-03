import React from 'react';

import styled from '@emotion/styled';

import Button from '@/components/common/Button';
import ProfileImage from '@/components/common/ProfileImage';
import ViewModalWindow from '@/components/common/ViewModalWindow';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useResponsive from '@/hooks/useResponsive';
import Divider from '@/styles/Divider';
import { body1Font, subtitle1Font } from '@/styles/fontStyles';
import GradientBlock from '@/styles/GradientBlock';
import mq from '@/styles/responsive';
import styledAnchor from '@/styles/styledAnchor';
import { emptyAThenB } from '@/utils/utils';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

function MembersViewModal({ isVisible, onClose }: Props) {
  const { data: applicants } = useFetchApplicants();
  const { isMobile, isClient } = useResponsive();

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
            <ProfileImage src={applicant.image} size={isMobile ? '36px' : '48px'} />
            <MemberInformation>
              <div>{emptyAThenB(applicant.email, applicant.name)}</div>
              <MemberMetaData>
                <div>{applicant.position}</div>
                {isClient && !isMobile && (
                  <Divider />
                )}
                {applicant.portfolioUrl && (
                  <PortfolioUrl
                    href={applicant.portfolioUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {applicant.portfolioUrl}
                  </PortfolioUrl>
                )}
              </MemberMetaData>
            </MemberInformation>
          </MemberWrapper>
        ))}
      </MembersListWrapper>
      {isMobile && (
        <>
          <GradientBlock />
          <CloseButtonWrapper data-testid="close-button-wrapper">
            <Button
              type="button"
              onClick={onClose}
              size="large"
              color="outlined"
            >
              닫기
            </Button>
          </CloseButtonWrapper>
        </>
      )}
    </ViewModalWindow>
  );
}

export default MembersViewModal;

const MembersListWrapper = styled.div`
  ${mq({
    height: ['calc(100% - 128px)', '350px'],
  })};

  overflow-y: auto;
`;

const MemberWrapper = styled.div`
  ${mq({
    alignItems: ['flex-start', 'center'],
  })};

  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const MemberInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12px;
  word-break: break-all;

  & > div:first-of-type {
    ${body1Font(true)}
  }
`;

const MemberMetaData = styled.div`
  ${styledAnchor}
  ${subtitle1Font()}

  ${mq({
    marginTop: ['2px', 0],
    flexDirection: ['column', 'row'],
    alignItems: ['flex-start', 'center'],
  })};

  display: flex;

  & > div:first-of-type {
  ${mq({
    marginBottom: ['2px', 0],
  })}

    white-space: nowrap;
    color: ${({ theme }) => theme.accent6};
  }
`;

const CloseButtonWrapper = styled.div`
  margin: 0 20px 20px 20px;

  & > button {
    width: 100%;
  }
`;

const PortfolioUrl = styled.a`
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
