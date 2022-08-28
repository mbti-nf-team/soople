import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import SkeletonItem from '../common/SkeletonItem';

import { PostWriter, RecruitPostWrapper } from './RecruitPost';
import { RecruitPostsWrapper } from './RecruitPosts';

function RecruitPostsSkeletonLoader(): ReactElement {
  return (
    <RecruitPostsWrapper title="loading...">
      {Array.from({ length: 12 }, (_, i) => (i)).map((key) => (
        <SkeletonBlock key={key}>
          <div className="contents">
            <div>
              <div className="thumbnail-skeleton-wrapper">
                <SkeletonItem
                  className="thumbnail-skeleton"
                  styles={{
                    borderRadius: '0',
                  }}
                />
              </div>
              <SkeletonItem
                styles={{
                  height: '24px',
                  width: '160px',
                  margin: '0 0 12px 0',
                  borderRadius: '6px',
                }}
              />
              <SkeletonItem
                styles={{
                  height: '18px',
                  width: '213px',
                  margin: '0 0 8px 0',
                }}
              />
              <SkeletonItem
                styles={{
                  height: '18px',
                  width: '100px',
                }}
              />
            </div>
            <SkeletonItem
              styles={{
                height: '14px',
                width: '64px',
              }}
            />
          </div>
          <PostWriter>
            <SkeletonItem
              styles={{
                height: '24px',
                width: '24px',
                minWidth: '24px',
                minHeight: '24px',
              }}
              circle
            />
            <SkeletonItem
              styles={{
                height: '14px',
                width: '64px',
              }}
            />
          </PostWriter>
        </SkeletonBlock>
      ))}
    </RecruitPostsWrapper>
  );
}

export default RecruitPostsSkeletonLoader;

const SkeletonBlock = styled(RecruitPostWrapper)`
  & > .contents {
    height: 100%; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 16px 12px;

    & > div {
      & > .thumbnail-skeleton-wrapper {
        margin: -16px -16px 16px -16px !important;
        position: relative;
        padding-top: 136px;
  
        & > .thumbnail-skeleton {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
