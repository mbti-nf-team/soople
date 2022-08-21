import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';

import SkeletonItem from '../common/SkeletonItem';

function AlarmsSkeletonLoader(): ReactElement {
  return (
    <AlarmsSkeletonLoaderWrapper title="loading...">
      {Array.from({ length: 12 }, (_, i) => (i)).map((key) => (
        <div key={key}>
          <div className="meta-data">
            <SkeletonItem width="32px" height="32px" margin="0 12px 0 0" circle />
            <div>
              <SkeletonItem width="120px" height="18px" margin="0 0 10px 0" />
              <SkeletonItem width="240px" height="20px" />
            </div>
          </div>
          <SkeletonItem width="64px" height="14px" />
        </div>
      ))}
    </AlarmsSkeletonLoaderWrapper>
  );
}

export default memo(AlarmsSkeletonLoader);

const AlarmsSkeletonLoaderWrapper = styled.div`
  & > div {
    display: flex;
    flex-direction: row;
    padding: 24px 16px 24px 16px;
    border-bottom: 0.5px solid ${({ theme }) => theme.accent2};
    justify-content: space-between;
    align-items: flex-start;

    & > div.meta-data {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }

    & > div > div {
      display: flex;
      flex-direction: column;
    }
  }
`;
