import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import useResponsive from '@/hooks/useResponsive';
import { Applicant } from '@/models/group';
import Divider from '@/styles/Divider';
import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import mq, { mobileMediaQuery } from '@/styles/responsive';
import styledAnchor from '@/styles/styledAnchor';
import { emptyAThenB, stringToExcludeNull } from '@/utils/utils';

import Button from '../common/Button';
import ProfileImage from '../common/ProfileImage';

interface Props {
  applicationForm: Applicant;
  onToggle: (applicant: Applicant) => void;
}

function ApplicantItem({ applicationForm, onToggle }: Props): ReactElement {
  const { isMobile, isClient } = useResponsive();
  const {
    portfolioUrl, applicant, introduce, isConfirm,
  } = applicationForm;
  const {
    image, name, email, position,
  } = applicant;

  return (
    <ApplicantItemWrapper>
      <ApplicantSubInformation>
        <ApplicantProfile>
          <ProfileImage size={isMobile ? '36' : '48'} src={image} />
          <ApplicantTextWrapper>
            <span>{emptyAThenB(email, name)}</span>
            <MetadataWrapper>
              <span>{position}</span>
              {!isMobile && isClient && (
                <Divider />
              )}
              <PortfolioUrl
                href={stringToExcludeNull(portfolioUrl)}
                rel="noopener noreferrer"
                target="_blank"
              >
                {portfolioUrl}
              </PortfolioUrl>
            </MetadataWrapper>
          </ApplicantTextWrapper>
        </ApplicantProfile>
        <div>
          <Button
            type="button"
            size="small"
            color={isConfirm ? 'primary' : 'outlined'}
            onClick={() => onToggle(applicationForm)}
          >
            {isConfirm ? '해제' : '선택'}
          </Button>
        </div>
      </ApplicantSubInformation>
      <IntroduceBlock>
        {introduce}
      </IntroduceBlock>
    </ApplicantItemWrapper>
  );
}

export default memo(ApplicantItem);

const ApplicantItemWrapper = styled.div`
  ${mq({
    marginTop: ['24px', '16px'],
  })}

  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 16px;
  }
`;

const ApplicantSubInformation = styled.div`
  ${mobileMediaQuery} {
    align-items: flex-start;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ApplicantProfile = styled.div`
  display: flex;
  flex-direction: row;
`;

const ApplicantTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;

  & > span {
    ${body1Font(true)};
  }

  div {
    color: ${({ theme }) => theme.accent6};
    ${subtitle1Font()};
  }
`;

const MetadataWrapper = styled.div`
  ${styledAnchor};
  ${mobileMediaQuery} {
    flex-direction: column;
    align-items: flex-start;

    & > span:first-of-type {
      margin-bottom: 2px;
    }
  }

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IntroduceBlock = styled.div`
  ${body2Font()};
  white-space: pre;
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
