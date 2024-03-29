import {
  ForwardedRef, forwardRef, memo, ReactElement,
} from 'react';
import { Eye as ViewsIcon } from 'react-feather';

import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { emptyAThenB } from '@nf-team/core';

import useRecruitDateStatus from '@/hooks/useRecruitDateStatus';
import { Group } from '@/models/group';
import Divider from '@/styles/Divider';
import { body2Font, h4Font, subtitle1Font } from '@/styles/fontStyles';
import { mq2 } from '@/styles/responsive';
import { removeAllHtml } from '@/utils/filter';

import ProfileImage from '../common/ProfileImage';

interface Props {
  group: Group;
  isPriority: boolean;
}

function RecruitPost({
  group, isPriority,
}: Props, ref: ForwardedRef<HTMLDivElement>): ReactElement {
  const {
    title, content, groupId, writer, views, shortDescription, thumbnail,
  } = group;

  const theme = useTheme();
  const recruitDate = useRecruitDateStatus(group);

  return (
    <RecruitPostWrapper ref={ref}>
      <RecruitPostContents href={`/detail/${groupId}`}>
        <PostPreview>
          {thumbnail && (
            <ThumbnailWrapper>
              <Thumbnail
                fill
                priority={isPriority}
                placeholder="empty"
                src={thumbnail}
                alt="thumbnail"
                sizes="(max-width: 650px) 100vw,
                (max-width: 850px) 50vw,
                33vw"
              />
            </ThumbnailWrapper>
          )}
          <Title>{title}</Title>
          <Content hasThumbnail={!!thumbnail} data-testid="content">
            {emptyAThenB(removeAllHtml(content), shortDescription)}
          </Content>
        </PostPreview>
        <PostMetaData>
          <ViewsIcon
            size={16}
            color={theme.background}
            fill={theme.accent6}
          />
          <span>{views}</span>
          <Divider />
          <span>{recruitDate}</span>
        </PostMetaData>
      </RecruitPostContents>
      <PostWriter>
        <ProfileImage
          size="24"
          src={writer.image}
        />
        <span>{emptyAThenB(writer.email, writer.name)}</span>
      </PostWriter>
    </RecruitPostWrapper>
  );
}

export default memo(forwardRef<HTMLDivElement, Props>(RecruitPost));

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
  background-color: ${({ theme }) => theme.background};
`;

const RecruitPostContents = styled(Link)`
  height: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 16px 12px;
`;

const Title = styled.div`
  ${h4Font(true)};
`;

const Content = styled.div<{ hasThumbnail: boolean; }>`
  ${body2Font()};
  color: ${({ theme }) => theme.accent7};
  word-break: break-all;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ hasThumbnail }) => (hasThumbnail ? 2 : 4)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMetaData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${subtitle1Font()};
  color: ${({ theme }) => theme.accent6};

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
  border-top: 1px solid ${({ theme }) => theme.accent1};
  ${subtitle1Font(true)};

  & > :first-of-type {
    margin-right : 8px;
  }
`;

const Thumbnail = styled(Image)`
  display: block;
  object-fit: cover;
`;

const ThumbnailWrapper = styled.div`
  margin: -16px -16px 16px -16px !important;
  position: relative;
  padding-top: 136px;
`;
