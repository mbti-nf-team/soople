import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';

import useCurrentTime from '@/hooks/useCurrentTime';
import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Group } from '@/models/group';
import { emptyAThenB } from '@/utils/utils';

import 'dayjs/locale/ko';

import ProfileImage from '../common/ProfileImage';

dayjs.locale('ko');

interface Props {
  group: Group
}

function RecruitPost({ group }: Props): ReactElement {
  const {
    title, content, groupId, writer,
  } = group;
  const currentTime = useCurrentTime();
  const recruitDate = useRecruitDateStatus(group, currentTime);

  return (
    <RecruitPostWrapper>
      <Link href={`/detail/${groupId}`} passHref>
        <StyledLink>{title}</StyledLink>
      </Link>
      <p>{content}</p>
      <small>{recruitDate}</small>
      <div>
        <ProfileImage
          src={writer.image}
        />
        <span>{emptyAThenB(writer.email, writer.name)}</span>
      </div>
    </RecruitPostWrapper>
  );
}

export default RecruitPost;

const RecruitPostWrapper = styled.div`
  border: 1px solid grey;
  margin: 1rem;
  padding: 0.5rem;
`;

const StyledLink = styled.a`
  font-size: 1.2rem;
`;
