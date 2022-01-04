import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import * as R from 'ramda';

import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Profile } from '@/models/auth';
import { Group } from '@/models/group';
import palette from '@/styles/palette';
import { emptyAThenB } from '@/utils/utils';

import 'dayjs/locale/ko';

import ProfileImage from '../common/ProfileImage';

import ApplyStatusButtonGroup from './ApplyStatusButtonGroup';

dayjs.locale('ko');

interface Props {
  group: Group;
  user: Profile | null;
  currentTime: number;
}

function DetailHeaderSection({ group, user, currentTime }: Props): ReactElement {
  const { writer } = group;

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
            <div>
              {recruitDate}
            </div>
          </WriterProfileTextWrapper>
        </WriterProfile>
        <ApplyStatusButtonGroup isWriter={isWriter} />
      </DetailSubInformation>
    </DetailHeaderSectionWrapper>
  );
}

export default DetailHeaderSection;

const DetailHeaderSectionWrapper = styled.section`
  border-bottom: 0.5px solid ${palette.accent2};
  margin-bottom: 40px;

  h2 {
    font-weight: bold;
    font-size: 32px;
    line-height: 48px;
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

  span {
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;
  }

  div {
    color: ${palette.accent6};
    font-size: 13px;
    line-height: 20px;
  }
`;
