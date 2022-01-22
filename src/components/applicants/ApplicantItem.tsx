import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import { Applicant } from '@/models/group';
import Divider from '@/styles/Divider';
import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import { emptyAThenB, stringToExcludeNull } from '@/utils/utils';

import Button from '../common/Button';
import ProfileImage from '../common/ProfileImage';

interface Props {
  applicationForm: Applicant;
  onToggle: (applicant: Applicant) => void;
}

function ApplicantItem({ applicationForm, onToggle }: Props): ReactElement {
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
          <ProfileImage size="48px" src={image} />
          <ApplicantTextWrapper>
            <span>{emptyAThenB(email, name)}</span>
            <MetadataWrapper>
              <span>{position}</span>
              <Divider />
              <a
                href={stringToExcludeNull(portfolioUrl)}
                rel="noopener noreferrer"
                target="_blank"
              >
                {portfolioUrl}
              </a>
            </MetadataWrapper>
          </ApplicantTextWrapper>
        </ApplicantProfile>
        <Button
          type="button"
          size="small"
          color={isConfirm ? 'primary' : 'outlined'}
          onClick={() => onToggle(applicationForm)}
        >
          {isConfirm ? '해제' : '선택'}
        </Button>
      </ApplicantSubInformation>
      <IntroduceBlock>
        {introduce}
      </IntroduceBlock>
    </ApplicantItemWrapper>
  );
}

export default memo(ApplicantItem);

const ApplicantItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  & > div {
    margin-bottom: 16px;
  }
`;

const ApplicantSubInformation = styled.div`
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
    color: ${palette.accent6};
    ${subtitle1Font()};
  }
`;

const MetadataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > a {
    color: ${palette.success10};
    transition: color 0.1s ease-in-out;

    &:hover {
      color: ${palette.success};
      text-decoration: underline;
    }
  }
`;

const IntroduceBlock = styled.div`
  ${body2Font()}
`;
