import React from 'react';

import styled from '@emotion/styled';

import SkeletonItem from '@/components/common/SkeletonItem';

function TagsBarSkeletonLoader() {
  return (
    <TagsBarSkeletonLoaderWrapper title="loading..." data-testid="loading-skeleton">
      {['80px', '120px', '80px', '80px', '120px', '64px'].map((width, index) => (
        <SkeletonItem
          // eslint-disable-next-line react/no-array-index-key
          key={index} // NOTE - 변경될 가능성도 없고, 항상 고정되어있는 배열이고 인덱스 번호도 고정이기 때문에 index 사용
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
