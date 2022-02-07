import React, { memo, ReactElement } from 'react';
import { Eye as ViewsIcon } from 'react-feather';

import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';

import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Group } from '@/models/group';
import Divider from '@/styles/Divider';
import { body2Font, h4Font, subtitle1Font } from '@/styles/fontStyles';
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
    title, content, groupId, writer, views,
  } = group;
  const recruitDate = useRecruitDateStatus(group);

  return (
    <RecruitPostWrapper>
      <RecruitPostContents>
        <PostPreview>
          <div>
            <Link href={`/detail/${groupId}`} passHref>
              <StyledLink>{title}</StyledLink>
            </Link>
          </div>
          <Content>{content}</Content>
        </PostPreview>
        <PostMetaData>
          <ViewsIcon
            size={16}
            color={palette.background}
            fill={palette.accent6}
          />
          <span>{views}</span>
          <Divider />
          <span>{recruitDate}</span>
        </PostMetaData>
      </RecruitPostContents>
      <PostWriter>
        <ProfileImage
          size="24px"
          src={writer.image}
        />
        <span>{emptyAThenB(writer.email, writer.name)}</span>
      </PostWriter>
    </RecruitPostWrapper>
  );
}

export default memo(RecruitPost);

const RecruitPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 245px;
  height: 346px; 
  margin: 0.625rem;
  border-radius: 8px;
  background-color: ${palette.background};
`;

const RecruitPostContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 16px 12px;
  height: 298px; 
`;

const StyledLink = styled.a`
  ${h4Font(true)};
`;

const Content = styled.div`
  ${body2Font()};
  color: ${palette.accent7};
`;

const PostMetaData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${subtitle1Font()};
  color: ${palette.accent6};

  & > svg {
    margin-right: 4px;
  }
`;

const PostPreview = styled.div`
  & > :not(div:last-of-type) {
    margin-bottom: 6px;
  }
`;

const PostWriter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid ${palette.accent1};
  ${subtitle1Font(true)};

  & > :first-of-type {
    margin-right : 8px;
  }
`;
