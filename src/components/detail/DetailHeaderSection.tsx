import { memo, PropsWithChildren, ReactElement } from 'react';
import { Eye as ViewsIcon } from 'react-feather';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import useResponsive from '@/hooks/useResponsive';
import { Group } from '@/models/group';
import Divider from '@/styles/Divider';
import {
  body1Font, h2Font, h3Font, subtitle1Font,
} from '@/styles/fontStyles';
import { mediaQueries } from '@/styles/responsive';
import { emptyAThenB } from '@/utils/utils';

import ProfileImage from '../common/ProfileImage';

interface Props {
  group: Group;
}

function DetailHeaderSection({ group, children }: PropsWithChildren<Props>): ReactElement {
  const {
    writer, views, isCompleted, numberApplicants,
  } = group;

  const theme = useTheme();
  const { isMobile } = useResponsive();

  const recruitDate = useRecruitDateStatus(group);

  return (
    <DetailHeaderSectionWrapper>
      <h2>{group.title}</h2>
      <DetailSubInformation>
        <WriterProfile>
          <ProfileImage
            src={writer.image}
            size={isMobile ? '36' : '48'}
          />
          <WriterProfileTextWrapper>
            <span>
              {emptyAThenB(writer.email, writer.name)}
            </span>
            <MetadataWrapper>
              <div className="view-wrapper">
                <ViewsIcon
                  size={16}
                  style={{
                    minHeight: 16,
                    minWidth: 16,
                  }}
                  color={theme.background}
                  fill={theme.accent6}
                />
                <span>{views}</span>
              </div>
              <Divider />
              <div>{recruitDate}</div>
              <Divider />
              <div className="number-applicant">{isCompleted ? `${numberApplicants}명 모집` : `${numberApplicants}명 신청 중`}</div>
            </MetadataWrapper>
          </WriterProfileTextWrapper>
        </WriterProfile>
        {children}
      </DetailSubInformation>
    </DetailHeaderSectionWrapper>
  );
}

export default memo(DetailHeaderSection);

const DetailHeaderSectionWrapper = styled.section`
  border-bottom: 0.5px solid ${({ theme }) => theme.accent2};
  margin-bottom: 40px;

  h2 {
    ${mediaQueries[0]} {
      ${h2Font(true)};
      margin-bottom: 12px;
    };

    ${h3Font(true)};
    margin-bottom: 16px;
  }
`;

const DetailSubInformation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const WriterProfile = styled.div`
  display: flex;
  flex-direction: row;
`;

const WriterProfileTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  display: flex;
  flex-direction: row;
  align-items: center;

  & > :not(:last-of-type) {
    ${subtitle1Font()};
    color: ${({ theme }) => theme.accent6};
    white-space: nowrap;
  }

  & > :last-of-type {
    ${subtitle1Font(true)};
    color: ${({ theme }) => theme.foreground};
  }

  .view-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 4px;
    }
  }

  .number-applicant {
    word-break: break-all;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
