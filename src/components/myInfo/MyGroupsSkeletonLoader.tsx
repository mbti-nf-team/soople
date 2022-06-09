import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import palette from '@/styles/palette';
import { mq2 } from '@/styles/responsive';

import SkeletonItem from '../common/SkeletonItem';

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

export default memo(MyGroupsSkeletonLoader);

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

export const MyGroupLayout = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  ${mq2({
    width: ['calc(100% - 3rem)', '686px'],
  })};

  & > :first-of-type {
    padding-top : 40px;
  }

  & > :last-of-type {
    margin-bottom : 40px;
  }
  
  & > :not(div:first-of-type) {
    padding-top: 24px;
  }

  & > :not(div:last-of-type) {
    padding-bottom: 24px;
    border-bottom: 0.5px solid ${palette.accent2};
  }
`;
