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
import { mq2 } from '@/styles/responsive';
import { removeAllHtml } from '@/utils/filter';
import { emptyAThenB } from '@/utils/utils';

import 'dayjs/locale/ko';

import ProfileImage from '../common/ProfileImage';

dayjs.locale('ko');

interface Props {
  group: Group;
}

function RecruitPost({ group }: Props): ReactElement {
  const {
    title, content, groupId, writer, views, shortDescription, thumbnail,
  } = group;
  const recruitDate = useRecruitDateStatus(group);

  return (
    <RecruitPostWrapper>
      <Link href={`/detail/${groupId}`} passHref>
        <RecruitPostContents>
          <PostPreview>
            {thumbnail && (
              <ThumbnailWrapper>
                <Thumbnail src={thumbnail} alt="thumbnail" />
              </ThumbnailWrapper>
            )}
            <Title>{title}</Title>
            <Content>{shortDescription || removeAllHtml(content)}</Content>
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
      </Link>
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

export const RecruitPostWrapper = styled.div`
  ${mq2({
    width: ['100%', '100%', 'calc(50% - 1.5rem)', '245px', '245px'],
  })};

  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 346px; 
  margin: 0.625rem;
  border-radius: 8px;
  background-color: ${palette.background};
`;

const RecruitPostContents = styled.a`
  height: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 16px 12px;
`;

const Title = styled.div`
  ${h4Font(true)};
`;

const Content = styled.div`
  ${body2Font()};
  color: ${palette.accent7};
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

export const PostWriter = styled.div`
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

const Thumbnail = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ThumbnailWrapper = styled.div`
  margin: -16px -16px 16px -16px !important;
  position: relative;
  padding-top: 136px;
`;
