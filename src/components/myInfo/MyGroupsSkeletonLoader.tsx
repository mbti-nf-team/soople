import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import SkeletonItem from '../common/SkeletonItem';

import { MyGroupLayout } from './MyGroups';

function MyGroupsSkeletonLoader(): ReactElement {
  return (
    <MyGroupLayout data-testid="skeleton-loader">
      {Array.from({ length: 7 }, (_, i) => (i)).map((key) => (
        <MyGroupsSkeletonItemWrapper key={key}>
          <div>
            <SkeletonItem width="160px" height="28px" margin="0 0 10px 0" />
            <SkeletonItem width="320px" height="20px" margin="0 0 26px 0" />
            <SkeletonItem width="120px" height="14px" />
          </div>
          <SkeletonItem width="174px" height="96px" />
        </MyGroupsSkeletonItemWrapper>
      ))}
    </MyGroupLayout>
  );
}

export default MyGroupsSkeletonLoader;

const MyGroupsSkeletonItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;
