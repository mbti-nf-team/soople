import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';

import useCurrentTime from '@/hooks/useCurrentTime';
import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Group } from '@/models/group';
import palette from '@/styles/palette';
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
  const currentTime = useCurrentTime(group);
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

export default memo(RecruitPost);

const RecruitPostWrapper = styled.div`
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: ${palette.background};
`;

const StyledLink = styled.a`
  font-size: 1.2rem;
`;
