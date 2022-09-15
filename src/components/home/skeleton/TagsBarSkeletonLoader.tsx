import React from 'react';

import styled from '@emotion/styled';
import { nanoid } from 'nanoid';

import SkeletonItem from '@/components/common/SkeletonItem';

function TagsBarSkeletonLoader() {
  return (
    <TagsBarSkeletonLoaderWrapper title="loading..." data-testid="loading-skeleton">
      {['80px', '120px', '80px', '80px', '120px', '64px'].map((width) => (
        <SkeletonItem
          key={nanoid()}
          styles={{
            height: '36px',
            width,
            borderRadius: '6px',
          }}
        />
      ))}
    </TagsBarSkeletonLoaderWrapper>
  );
}

export default TagsBarSkeletonLoader;

const TagsBarSkeletonLoaderWrapper = styled.div`
  height: 36px;
  overflow: hidden;

  & > :not(:last-of-type) {
    margin-right: 8px;
  }
`;
