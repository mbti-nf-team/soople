import React, { ReactElement } from 'react';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';

import useCurrentTime from '@/hooks/useCurrentTime';
import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Group } from '@/models/group';

import 'dayjs/locale/ko';

dayjs.locale('ko');

interface Props {
  group: Group
}

function RecruitPost({ group }: Props): ReactElement {
  const {
    title, contents, groupId, writer,
  } = group;
  const currentTime = useCurrentTime();
  const recruitDate = useRecruitDateStatus(group, currentTime);

  return (
    <RecruitPostWrapper>
      <Link href={`/detail/${groupId}`} passHref>
        <StyledLink>{title}</StyledLink>
      </Link>
      <p>{contents}</p>
      <small>{recruitDate}</small>
      <div>
        {writer.image ? (
          <img src={writer.image} alt="writer-img" width="30px" height="30px" />
        ) : (
          <small>이미지 없음</small>
        )}
        <span>{writer.name || writer.email}</span>
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
