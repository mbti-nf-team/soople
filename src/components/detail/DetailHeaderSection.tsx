import React, { ReactElement } from 'react';
import { Eye as ViewsIcon } from 'react-feather';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import * as R from 'ramda';

import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Profile } from '@/models/auth';
import { Group } from '@/models/group';
import Divider from '@/styles/Divider';
import { body1Font, h2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import { emptyAThenB } from '@/utils/utils';

import 'dayjs/locale/ko';

import ProfileImage from '../common/ProfileImage';

import ApplicantStatusButton from './ApplicantStatusButton';
import WriterStatusButtons from './WriterStatusButtons';

dayjs.locale('ko');

interface Props {
  group: Group;
  user: Profile | null;
  currentTime: number;
}

function DetailHeaderSection({ group, user, currentTime }: Props): ReactElement {
  const { writer, isCompleted, views } = group;

  const recruitDate = useRecruitDateStatus(group, currentTime);
  const isWriter = R.equals(writer.uid, user?.uid);

  return (
    <DetailHeaderSectionWrapper>
      <h2>{group.title}</h2>
      <DetailSubInformation>
        <WriterProfile>
          <ProfileImage
            src={writer.image}
            size="50px"
          />
          <WriterProfileTextWrapper>
            <span>
              {emptyAThenB(writer.email, writer.name)}
            </span>
            <MetadataWrapper>
              <div className="view-wrapper">
                <ViewsIcon
                  size={16}
                  color={palette.background}
                  fill={palette.accent6}
                />
                <span>{views}</span>
              </div>
              <Divider />
              <div>{recruitDate}</div>
              <Divider />
            </MetadataWrapper>
          </WriterProfileTextWrapper>
        </WriterProfile>
        {isWriter ? (
          <WriterStatusButtons isCompleted={isCompleted} />
        ) : (
          <ApplicantStatusButton isCompleted={isCompleted} />
        )}
      </DetailSubInformation>
    </DetailHeaderSectionWrapper>
  );
}

export default DetailHeaderSection;

const DetailHeaderSectionWrapper = styled.section`
  border-bottom: 0.5px solid ${palette.accent2};
  margin-bottom: 40px;

  h2 {
    ${h2Font(true)};
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
    color: ${palette.accent6};
    ${subtitle1Font()};
  }
`;

const MetadataWrapper = styled.div`
  ${subtitle1Font()};
  color: ${palette.accent6};
  display: flex;
  flex-direction: row;
  align-items: center;

  .view-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 4px;
    }
  }
`;
